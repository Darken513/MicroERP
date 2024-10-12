import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsChainComponent } from './items-chain.component';

describe('ItemsChainComponent', () => {
  let component: ItemsChainComponent;
  let fixture: ComponentFixture<ItemsChainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsChainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemsChainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
