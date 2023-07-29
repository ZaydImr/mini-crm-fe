import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { TokenStorageService } from "./services/token-storage.service";

export function TokenInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
    const tokenService = inject(TokenStorageService);
    let user = tokenService.getUser();
    const clonedRequest = request.clone({
        setHeaders: {
            Authorization: `${user?.type} ${user?.accessToken}`
        }
    });
    return next(clonedRequest).pipe()
}