import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { User } from './models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, HttpClientModule, CommonModule, FormsModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent {
	title = 'UI';

	formularioVisible: boolean = false;
	tablaVisible: boolean = true;

	userForm: any = {
		userName: '',
		password: '',
	};

	userList: User[] = [];

	constructor(private userService: UserService) {}

	ngOnInit() {
		this.getUsers();
	}

	/**
	 * The `toggleFormulario` function toggles the visibility of a form and a table in a TypeScript class.
	 */
	toggleFormulario() {
		this.formularioVisible = !this.formularioVisible;
		this.tablaVisible = !this.tablaVisible;
	}

	/**
	 * The `registerUser` function registers a new user by calling the `createUser` method of a service,
	 * handling success and error responses with appropriate messages and actions.
	 */
	registerUser() {
		// console.log('Datos del usuario a registrar:', this.userForm);
		this.userService.createUser(this.userForm).subscribe({
			next: (response) => {
				// console.log('Usuario creado correctamente');
				Swal.fire({
					icon: 'success',
					title: 'Usuario creado correctamente',
					showConfirmButton: false,
					timer: 2500,
				});
				// Reinicia el formulario
				this.userForm = {
					userName: '',
					password: '',
				};
				// Oculta el formulario y muestra la tabla
				this.toggleFormulario();
				// Actualiza la lista de usuarios
				this.getUsers();
			},
			error: (error) => {
				console.error('Error al crear usuario:', error.message);
				Swal.fire({
					icon: 'error',
					title: 'Error al crear usuario',
					text:
						error.message ||
						'Por favor, inténtalo de nuevo más tarde.',
					showConfirmButton: false,
					timer: 3000,
				});
			},
		});
	}

	/**
	 * The `getUsers` function retrieves a list of users from a service and assigns it to the `userList`
	 * property, handling errors if they occur.
	 */
	getUsers() {
		this.userService.getUsers().subscribe({
			next: (users) => {
				this.userList = users;
			},
			error: (error) => {
				console.error('Error al obtener usuarios:', error);
			},
		});
	}

	/**
	 * The function `getUserById` retrieves user details from a service and displays them in a SweetAlert
	 * dialog or shows an error alert if unsuccessful.
	 * @param {User} user - The `getUserById` function you provided seems to be a method in a TypeScript
	 * class that fetches user details by their ID using an asynchronous call to a UserService. When the
	 * user details are successfully retrieved, it displays the user's information in a SweetAlert dialog.
	 * If an error occurs during the retrieval
	 */
	getUserById(user: User) {
		// Llama al método getUserById del servicio UserService para obtener los detalles del usuario
		this.userService.getUserById(user.id).subscribe({
			next: (userData) => {
				// Muestra los datos del usuario en un SweetAlert
				Swal.fire({
					title: 'Detalles del Usuario',
					html: `
            <b>Usuario:</b> ${userData.userName}<br>
            <b>Contraseña:</b> ${userData.password}<br>
          `,
					confirmButtonText: 'Cerrar',
				});
			},
			error: (error) => {
				// Muestra una alerta de error si no se puede obtener los detalles del usuario
				Swal.fire({
					icon: 'error',
					title: 'Error al obtener detalles del usuario',
					text: 'Por favor, inténtalo de nuevo más tarde.',
				});
			},
		});
	}

	/**
	 * The updateUser function retrieves a user by id, displays a modal for editing user details, and saves
	 * the updated user information.
	 * @param {number} id - The `id` parameter in the `updateUser` function is the unique identifier of the
	 * user that you want to update. This function retrieves the user details by the provided `id`,
	 * displays a modal dialog using SweetAlert2 with input fields pre-filled with the user's current
	 * information (username and password
	 */
	updateUser(id: number) {
		this.userService.getUserById(id).subscribe({
			next: (user) => {
				Swal.fire({
					title: 'Editar Usuario',
					html: `
          <input id="userName" class="swal2-input" placeholder="Usuario" value="${user.userName}">
          <input id="password" class="swal2-input" placeholder="Contraseña" value="${user.password}">
        `,
					showCancelButton: true,
					confirmButtonText: 'Guardar',
					cancelButtonText: 'Cancelar',
					focusConfirm: false,
					preConfirm: () => {
						const userName = (
							document.getElementById(
								'userName'
							) as HTMLInputElement
						).value;
						const password = (
							document.getElementById(
								'password'
							) as HTMLInputElement
						).value;
						this.saveUpdatedUser(id, { userName, password });
					},
				});
			},
			error: (error) => {
				console.error('Error al obtener usuario para editar:', error);
				Swal.fire({
					icon: 'error',
					title: 'Error al obtener usuario para editar',
					text: 'Por favor, inténtalo de nuevo más tarde.',
				});
			},
		});
	}

	/**
	 * The function `saveUpdatedUser` updates a user using a user service, displays success or error
	 * messages using SweetAlert, and then fetches updated user data.
	 * @param {number} id - The `id` parameter is the unique identifier of the user that you want to
	 * update. It is used to specify which user's information should be updated in the system.
	 * @param {any} userForm - The `userForm` parameter in the `saveUpdatedUser` function likely contains
	 * the updated information of a user that needs to be saved. It could include fields such as the user's
	 * name, email, address, or any other details that can be edited for the user.
	 */
	saveUpdatedUser(id: number, userForm: any) {
		this.userService.editUser(id, userForm).subscribe({
			next: () => {
				Swal.fire({
					icon: 'success',
					title: 'Usuario actualizado correctamente',
					showConfirmButton: false,
					timer: 2500,
				});
				this.getUsers();
			},
			error: (error) => {
				console.error('Error al actualizar usuario:', error);
				Swal.fire({
					icon: 'error',
					title: 'Error al actualizar usuario',
					text: 'Por favor, inténtalo de nuevo más tarde.',
				});
			},
		});
	}

	deleteUser(id: number) {
		Swal.fire({
			title: '¿Estás seguro que deseas eliminar este registro?',
			text: '¡No podrás revertir esto!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: '¡Sí, eliminarlo!',
			cancelButtonText: 'Cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				this.userService.deleteUser(id).subscribe({
					next: () => {
						Swal.fire(
							'¡Eliminado!',
							'El usuario ha sido eliminado.',
							'success'
						);
						this.getUsers(); // Actualizar la lista de usuarios después de eliminar uno
					},
					error: (error) => {
						console.error('Error al eliminar usuario:', error);
						Swal.fire({
							icon: 'error',
							title: 'Error al eliminar usuario',
							text: 'Por favor, inténtalo de nuevo más tarde.',
						});
					},
				});
			}
		});
	}
}
