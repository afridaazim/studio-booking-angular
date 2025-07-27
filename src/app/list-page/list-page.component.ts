import {Component, OnInit} from '@angular/core';
import {Studio} from '../studio';
import {StudioService} from '../studio.service';
import {HttpClient, HttpClientModule, provideHttpClient} from '@angular/common/http';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})

// standalone: true,
//   imports: [CommonModule, FormsModule, NgFor, HttpClientModule],
export class ListPageComponent  implements OnInit{
  studios: Studio[] = [];
  filteredStudios: Studio[] = [];
  searchTerm = '';
  selectedStudio: Studio | null = null;
  currentPage = 1;
  pageSize = 5;
  paginatedStudios: Studio[] = [];
  constructor(private studioService: StudioService, private http: HttpClient) {}
  ngOnInit(): void {
    this.studioService.getStudios().subscribe((data) => {
      console.log("...data", data);
      this.studios = data;
      this.filteredStudios = data;

      this.currentPage = 1;
      this.updatePaginatedStudios();
    });
  }
  // onSearch(): void {
  //   const term = this.searchTerm.toLowerCase();
  //   this.filteredStudios = this.studios.filter(studio =>
  //     studio.location.area.toLowerCase().includes(term) ||
  //     studio.location.city.toLowerCase().includes(term)
  //   );
  // }
  onSearch(): void {
    const term = this.searchTerm?.toLowerCase().trim() || '';

    this.filteredStudios = this.studios.filter(studio =>
      studio.location.area.toLowerCase().includes(term) ||
      studio.location.city.toLowerCase().includes(term)
    );
    this.currentPage = 1;
    this.updatePaginatedStudios();
  }

  openBookingModal(studio: Studio): void {
    this.selectedStudio = studio;
  }
  closeModal(): void {
    this.selectedStudio = null;
  }

  updatePaginatedStudios(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedStudios = this.filteredStudios.slice(startIndex, startIndex + this.pageSize);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginatedStudios();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredStudios.length / this.pageSize);
  }
}
