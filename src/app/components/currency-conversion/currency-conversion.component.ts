import { Component, OnInit } from '@angular/core';
import { Currency, CurrencyService } from '../../shared/currency.service';
import { ActivatedRoute, Router } from '@angular/router';

enum Direction {
  FROM = 'from',
  TO = 'to',
}

@Component({
  selector: 'currency-conversion',
  templateUrl: './currency-conversion.component.html',
  styleUrls: ['./currency-conversion.component.css']
})
export class CurrencyConversionComponent implements OnInit {

  currencies: Currency[] = [];
  from: Currency;
  to: Currency;
  fromAmount: number = 10;
  toAmount: number = 10;
  public direction: typeof Direction = Direction;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private  currencyService: CurrencyService
  ) {
  }

  ngOnInit(): void {
    this.currencyService.getCurrencies().subscribe((currencies: Currency[]) => {
      console.log(currencies);
      this.currencies = currencies;
      this.initFromQueryParams();
      this.calculate(Direction.FROM);
    });
  }

  calculate(direction: Direction): void {
    if (this.to != null && this.from != null) {
      this.createUrlParams();
      const eurCrossRate = 1 / this.from.rate;
      let rate = eurCrossRate * this.to.rate;

      if (direction == Direction.FROM ) {
        this.toAmount = this.round(rate * this.fromAmount);
      } else {
        rate = 1 / rate;
        this.fromAmount = this.round(rate * this.toAmount);
      }
    }
  }

  private createUrlParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        from: this.from.type,
        fromAmount: this.fromAmount,
        to: this.to.type,
        toAmount: this.toAmount,
      },
      queryParamsHandling: 'merge',
    });
  }

  private round(num: number): number {
    return Math.round(num * 100) / 100;
  }

  private initFromQueryParams() {
    const { queryParams } = this.route.snapshot;
    if (queryParams.fromAmount) {
      this.fromAmount = queryParams.fromAmount;
    }
    if (queryParams.from) {
      this.from = this.currencies.find(c => c.type === queryParams.from);
    }
    if (queryParams.toAmount) {
      this.toAmount = queryParams.toAmount;
    }
    if (queryParams.to) {
      this.to = this.currencies.find(c => c.type === queryParams.to);
    }
  }
}
