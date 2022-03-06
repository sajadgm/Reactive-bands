import { bufferCount, bufferTime } from 'rxjs';
import { BandDataService } from './band-data.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private bandDataService: BandDataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.bandDataService
      .getUpdates()
      .pipe(bufferCount(5))
      .subscribe((bands) => {
        const bandNames = bands.map((b) => b.name).join(' ,');
        this.toastr.info(`Band ${bandNames} has been updated`);
      });
  }
}
