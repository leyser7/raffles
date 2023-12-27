import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from './ticket.interface';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { MatButtonModule } from '@angular/material/button';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  selectedTicket: Ticket = {} as Ticket;
  closeResult = '';

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getTickets();
  }

  openDialog(data: Ticket): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: data,
    });
    dialogRef.afterClosed().subscribe((data: Ticket) => {
      if (!data) {
        return;
      }
      this.postTickets({
        id: data.id,
        name: data.name,
        state: data.state,
      });
    });
  }

  getTickets(): void {
    this.http
      .get<Ticket[]>('http://localhost:3000/tickets')
      .subscribe((data: Ticket[]) => {
        this.tickets = data.sort((a, b) => a.id - b.id);
      });
  }

  postTickets(newTicketData: any): void {
    this.http
      .post('http://localhost:3000/tickets', newTicketData)
      .subscribe(() => {
        this.getTickets();
      });
  }
}
