import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	/* The line `private apiUrl = `${environment.baseApiUrl}/users`;` in the UserService class is defining
	a private property called `apiUrl` which is a string representing the base URL for the API endpoint
	related to users. */
	private apiUrl = `${environment.baseApiUrl}/users`;

	/**
	 * The constructor function takes an instance of HttpClient as a parameter and assigns it to a private
	 * property http.
	 * @param {HttpClient} http - The `http` parameter in the constructor is of type `HttpClient`, which
	 * is a service provided by Angular for making HTTP requests to a server. It allows you to communicate
	 * with a server-side API to fetch data, send data, update data, or delete data.
	 */
	constructor(private http: HttpClient) {}

	/**
	 * The function `createUser` sends a POST request to the API with user data and handles errors by
	 * returning a custom error message.
	 * @param {any} userData - The `userData` parameter in the `createUser` function represents the data
	 * that will be sent to the server when creating a new user. This data typically includes information
	 * such as the user's name, email, password, and any other relevant details needed to create a user
	 * account.
	 * @returns The `createUser` function returns an Observable that makes a POST request to the specified
	 * API endpoint with the provided `userData`. If an error occurs during the HTTP request, the function
	 * catches the error, creates a new Error object with a custom message, and throws it as an Observable
	 * error using `throwError`.
	 */
	createUser(userData: any): Observable<any> {
		return this.http.post<any>(`${this.apiUrl}`, userData).pipe(
			catchError((error) => {
				return throwError(
					() => new Error('Error al crear usuario: ' + error.message)
				);
			})
		);
	}

	/**
	 * The function `getUsers()` makes an HTTP GET request to fetch a list of users and handles errors by
	 * returning a custom error message.
	 * @returns The `getUsers()` method returns an Observable of type `User[]`. It makes an HTTP GET
	 * request to the specified API URL to fetch a list of users. If an error occurs during the HTTP
	 * request, the method catches the error, creates a new Error object with a custom message, and throws
	 * it as an Observable error using the `throwError` operator.
	 */
	getUsers(): Observable<User[]> {
		return this.http.get<User[]>(this.apiUrl).pipe(
			catchError((error) => {
				return throwError(
					() =>
						new Error('Error al obtener usuarios: ' + error.message)
				);
			})
		);
	}

	/**
	 * The function `getUserById` retrieves a user by their ID from a specified API URL and handles errors
	 * by throwing a custom error message.
	 * @param {number} id - The `id` parameter in the `getUserById` function is of type `number` and
	 * represents the unique identifier of the user whose information is being retrieved.
	 * @returns The `getUserById` method returns an Observable of type `User`. It makes an HTTP GET request
	 * to the specified URL to fetch a user by their ID. If an error occurs during the HTTP request, the
	 * method catches the error, creates a new Error object with a custom message, and throws it as an
	 * observable error using the `throwError` operator.
	 */
	getUserById(id: number): Observable<User> {
		const url = `${this.apiUrl}/${id}`;
		return this.http.get<User>(url).pipe(
			catchError((error) => {
				return throwError(
					() =>
						new Error(
							'Error al obtener el usuario: ' + error.message
						)
				);
			})
		);
	}

	/**
	 * The function `editUser` sends a PATCH request to update a user with the provided ID using the
	 * Angular HttpClient in TypeScript.
	 * @param {number} id - The `id` parameter in the `editUser` function is a number that represents the
	 * unique identifier of the user you want to edit. This identifier is used to locate the specific user
	 * in the database or API and update their information.
	 * @param {User} user - The `editUser` function takes two parameters:
	 * @returns The `editUser` method returns an Observable that makes a PATCH request to the specified URL
	 * with the provided user data. If an error occurs during the request, it catches the error and throws
	 * a new Error with a custom message indicating that there was an error editing the user.
	 */
	editUser(id: number, user: User): Observable<any> {
		const url = `${this.apiUrl}/${id}`;
		return this.http.patch<any>(url, user).pipe(
			catchError((error) => {
				return throwError(
					() =>
						new Error(
							'Error al editar el usuario: ' + error.message
						)
				);
			})
		);
	}

	/**
	 * The function deleteUser takes an id as a parameter and sends a DELETE request to the API to delete a
	 * user, handling errors and returning an Observable.
	 * @param {number} id - The `id` parameter in the `deleteUser` method is a number that represents the
	 * unique identifier of the user that you want to delete from the server. This identifier is used to
	 * construct the URL for the DELETE request to the API endpoint that handles user deletion.
	 * @returns The `deleteUser` method returns an Observable that makes a DELETE request to the API
	 * endpoint with the specified `id`. If the request is successful, it will return an empty response. If
	 * an error occurs during the request, it will catch the error, create a new Error object with a custom
	 * message, and throw that error using `throwError`.
	 */
	deleteUser(id: number): Observable<any> {
		const url = `${this.apiUrl}/${id}`;
		return this.http.delete<any>(url).pipe(
			catchError((error) => {
				return throwError(
					() =>
						new Error(
							'Error al eliminar el usuario: ' + error.message
						)
				);
			})
		);
	}
}
