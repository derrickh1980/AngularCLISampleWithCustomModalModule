// Angular imports.
import { Injectable, ViewContainerRef, Injector, Compiler, ReflectiveInjector, ComponentRef } from '@angular/core';

// RxJS imports.
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

// App imports.
import { AppModule } from '../../../app.module';
import { ModalModel } from '../models/modal.model';

@Injectable()
export class ModalService {
 public activeInstances: number = 0;
    private injector: Injector;
    private vcRef: ViewContainerRef;

    constructor(private compiler: Compiler) { };

    create<T>(component: any, parameters?: Object): Observable<ComponentRef<T>> {
        let componentRef$ = new ReplaySubject();
        this.compiler.compileModuleAndAllComponentsAsync(AppModule)
            .then(factory => {
                let componentFactory = factory.componentFactories.filter(item => item.componentType === component)[0];
                const childInjector = ReflectiveInjector.resolveAndCreate([], this.injector);
                let componentRef = this.vcRef.createComponent(componentFactory, 0, childInjector);
                Object.assign(componentRef.instance, parameters); // pass the @Input parameters to the instance
                this.activeInstances++;

                componentRef.instance.isShowing = true;

                if (componentRef.instance.onCreate) {
                    componentRef.instance.onCreate();
                }

                componentRef.instance["componentIndex"] = this.activeInstances;
                componentRef.instance["destroy"] = () => {
                    this.activeInstances--;
                    componentRef.destroy();
                };
                componentRef$.next(componentRef);
                componentRef$.complete();
            });
        return <Observable<ComponentRef<T>>>componentRef$.asObservable();
    };

    registerInjector(injector: Injector): void {
        this.injector = injector;
    };

    registerViewContainerRef(vcRef: ViewContainerRef): void {
        this.vcRef = vcRef;
    };
}
