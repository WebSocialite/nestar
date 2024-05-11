import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";
import { stringify } from "querystring";
import { Observable} from "rxjs";
import { tap } from 'rxjs/operators';
 


@Injectable()
export class LoggingInterceptor implements NestInterceptor {

    private readonly logger: Logger = new Logger();

    public intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const recordTime = Date.now();
        const requestType = context.getType<GqlContextType>();

        if(requestType === "http") {
            // Develop if needed!
        } else if (requestType === 'graphql') {
            //  (1) PRINT REQUEST  
            const gqlContext = GqlExecutionContext.create(context);
            this.logger.log(`${this.stringify(gqlContext.getContext().req.body)}`,'REQUEST');

            // (2) ERRORS handling via GRAPHQL

            // (3) NO ERRORS GIVING RESPONSE BELOW
            return next
            .handle()
            .pipe(
                tap((context) => {
                    const responseTime = Date.now() - recordTime;
                    this.logger.log(`${this.stringify(context)} - ${responseTime}ms \n\n` , 'RESPONSE');
            }),
            );
        }
        
        
    }

    private stringify(context: ExecutionContext): string {
        console.log( typeof context);
        return JSON.stringify(context).slice(0, 75);
    }
}