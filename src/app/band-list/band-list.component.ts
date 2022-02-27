import { tap, withLatestFrom } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  map,
  merge,
  mergeMap,
  Observable,
  startWith,
  take,
} from 'rxjs';

import { BandDataService } from '../band-data.service';
import { Band } from '../model';

@Component({
  selector: 'app-band-list',
  templateUrl: 'band-list.component.html',
})
export class BandListComponent implements OnInit {
  model$: Observable<{ bands: Band[]; isLoading: boolean }>;
  loadingDots: string = '';

  constructor(
    private bandDataService: BandDataService,
    private activatedRoute: ActivatedRoute
  ) {}

  refreshDataClickSubject = new BehaviorSubject<Band[]>([]);
  private refreshDataClickAction$ = this.refreshDataClickSubject.asObservable();

  ngOnInit(): void {
    const refreshTrigger$ = combineLatest([
      this.refreshDataClickAction$,
      this.activatedRoute.queryParams,
    ]).pipe(
      map(([_, params]) => {
        if (params?.['active'] === undefined) return undefined;
        return params?.['active'] === 'true';
      })
    );

    const bandList$ = refreshTrigger$.pipe(
      mergeMap((active) => this.bandDataService.getBands(active))
    );

    this.model$ = merge(
      refreshTrigger$.pipe(map(() => ({ bands: [], isLoading: true }))),
      bandList$.pipe(map((bands) => ({ bands: bands, isLoading: false })))
    );

    //load data Dots increase but now no longer work
    const loadDots$ = refreshTrigger$.pipe(
      map((d) => {
        let ex = this.loadingDots.split('\n');
        this.loadingDots = '' + ex + ' . ';
      }),
      take(5)
    );
  }
}
function Last(
  queryParams: Observable<Params>
): import('rxjs').OperatorFunction<Band[], unknown> {
  throw new Error('Function not implemented.');
}
