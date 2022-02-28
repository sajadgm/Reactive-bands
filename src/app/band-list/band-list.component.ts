import { UserDataService } from './../user-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  map,
  merge,
  mergeMap,
  Observable,
  take,
  tap,
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
    private activatedRoute: ActivatedRoute,
    private userDataService: UserDataService
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
      mergeMap((active) =>
        forkJoin([
          this.bandDataService.getBands(active),
          this.userDataService.currentUser,
        ])
      ),
      tap((d) => console.log(d)),
      map(([bands, currentUser]) =>
        bands.map((band) =>
          band.id === currentUser.favoritBandId
            ? { ...band, favorite: true }
            : band
        )
      ),
      tap((d) => console.log(d, 'result'))
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
