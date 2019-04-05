import { CorsesBorderDirective } from './corses-border.directive';
import { ElementRef } from '@angular/core';

class MockElementRef implements ElementRef {
    nativeElement = {};
  }

describe('CorsesBorderDirective', () => {
  it('should create an instance', () => {
    const directive = new CorsesBorderDirective(new MockElementRef());
    expect(directive).toBeTruthy();
  });
});
