import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../services/usuario.service';
import { OrganizacionService } from '../services/organizacion.service'; // AÑADIDO
import { Usuario } from '../models/usuario.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-org-users-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="user-manager">
      <h4>Usuarios Involucrados</h4>
      
      <!-- Lista de usuarios vinculados con Control Flow -->
      @if (loadingUsers) {
        <p><em>Cargando usuarios...</em></p>
      } @else {
        @if (orgUsuarios && orgUsuarios.length > 0) {
          <ul>
            @for (user of orgUsuarios; track user._id) {
              <li>
                {{ user.name }} ({{ user.email }})
                <button class="btn btn-small delete-btn" (click)="eliminarUsuario(user)">Eliminar</button>
              </li>
            }
          </ul>
        } @else {
          <p>No hay usuarios asignados a esta organización.</p>
        }
      }

      <!-- Componente para añadir usuarios -->
      <div class="add-user-section">
        <h5>Añadir Usuario Existente</h5>
        <select [(ngModel)]="selectedUserId" class="form-select">
          <option [ngValue]="null">-- Selecciona un usuario --</option>
          @for (u of availableUsers; track u._id) {
            <option [value]="u._id">{{ u.name }} ({{ u.email }})</option>
          }
        </select>
        <button class="btn btn-small" (click)="addToOrg()" [disabled]="!selectedUserId">Asignar a Organización</button>
      </div>
    </div>
  `,
  styles: [`
    .user-manager { border-top: 1px dashed #ccc; margin-top: 15px; padding-top: 10px; }
    .btn-small { padding: 4px 8px; font-size: 0.85em; margin-left: 10px; cursor: pointer; }
    .delete-btn { background-color: #ff4d4d; color: white; border: none; border-radius: 4px; }
    .add-user-section { margin-top: 15px; background: #f9f9f9; padding: 10px; border-radius: 5px; }
    .form-select { padding: 6px; margin-right: 10px; border-radius: 4px; border: 1px solid #ccc; width: 60%; }
    h4, h5 { margin-bottom: 10px; color: #333; }
    ul { padding-left: 20px; }
    li { margin-bottom: 5px; }  //diseño hecho con ia 
  `]
})
export class OrgUsersManager implements OnInit { //esta funcion es para gestionar los usuarios de una organización
  @Input() organizacionId!: string;
 
  @Output() userChanged = new EventEmitter<void>();

  orgUsuarios: Usuario[] = [];
  allUsers: Usuario[] = [];
  selectedUserId: string | null = null;
  loadingUsers = true;

  constructor(private usuarioService: UsuarioService, private organizacionService: OrganizacionService) {}

  ngOnInit() {
    this.loadUsersData();
  }

  loadUsersData() {
    this.loadingUsers = true;
    
    // Obtenemos todos los usuarios (para seleccionar)
    this.usuarioService.getUsuarios().subscribe(users => {
      this.allUsers = users;
    });

    // AÑADIDO: Obtenemos SOLO los usuarios populados de ESTA organización desde el endpoint del backend responsable del .populate()
    this.organizacionService.getOrganizacionUsuarios(this.organizacionId).subscribe(
      orgUsersResult => {  //rellenado con ia
        this.orgUsuarios = orgUsersResult;
        this.loadingUsers = false;
      },
      error => {
        this.loadingUsers = false;
      }
    );
  }

  get availableUsers() {
    // Filtramos los usuarios que NO están ya en esta organización 
    return this.allUsers.filter(u => {  //ayuda de ia
      if (!u.organizacion) return true;
      const orgId = typeof u.organizacion === 'object' ? u.organizacion._id : u.organizacion;
      return orgId !== this.organizacionId;
    });
  }

  addToOrg() {
    if (!this.selectedUserId) return;
    const user = this.allUsers.find(u => u._id === this.selectedUserId);
    if (!user) return;

    // Actualizamos el usuario asignándole esta nueva organización
    this.usuarioService.updateUsuario(
      user._id,
      user.name,
      user.email,
      user.password || '', // Contraseña vacia
      this.organizacionId
    ).subscribe(() => {
      this.selectedUserId = null;
      this.userChanged.emit();
      this.loadUsersData();
    });
  }

  eliminarUsuario(user: Usuario) { //
    if (confirm('¿Eliminar definitivamente este usuario?')) {
      this.usuarioService.deleteUsuario(user._id).subscribe(() => {
        this.userChanged.emit();
        this.loadUsersData();
      });
    }
  }
}
