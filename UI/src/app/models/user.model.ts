/* This code snippet is defining an interface named `User` in TypeScript. An interface in TypeScript is
a way to define the shape of an object. In this case, the `User` interface has the following
properties:
- `id` of type `number`
- `userName` of type `string`
- `password` of type `string`
- `createdAt` of type `Date` (optional property denoted by `?`)
- `updatedAt` of type `Date` (optional property denoted by `?`) */
export interface User {
	id: number;
	userName: string;
	password: string;
	createdAt?: Date;
	updatedAt?: Date;
}
