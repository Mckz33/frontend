import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appFor]'
})
export class ForDirective implements OnInit {

  @Input('appForEm') numbers!: number[];

  constructor(private container: ViewContainerRef,
              private templete: TemplateRef<any>
  ) { }

  ngOnInit(): void {
    for (let number of this.numbers){
      this.container.createEmbeddedView(this.templete, { $implicit: number });
    }
  }

}
