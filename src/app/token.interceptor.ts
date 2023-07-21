import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { TokenStorageService } from "./services/token-storage.service";

export function TokenInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
    const tokenService = inject(TokenStorageService);
    let token = tokenService.getToken();
    const clonedRequest = request.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });
    return next(clonedRequest).pipe()
}