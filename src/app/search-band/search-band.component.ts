import { Band } from './../model';
import { BandDataService } from './../band-data.service';
import { Component, OnInit } from '@angular/core';
import { Subject, Observable, mergeMap, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-band',
  templateUrl: './search-band.component.html',
  styleUrls: ['./search-band.component.scss'],
})
export class SearchBandComponent implements OnInit {
  constructor(private bandDataService: BandDataService) {}

  search$ = new Subject();
  searchResult$: Observable<Band[]> = this.search$.pipe(
    debounceTime(500),
    mergeMap(
      (searchedText): Observable<Band[]> =>
        this.bandDataService.searchBands(searchedText)
    )
  );

  ngOnInit(): void {}
}
