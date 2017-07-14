import { Component } from '@angular/core';

@Component({
  selector: 'alloy-dropdown',
  template: `
    <div class="dropdown-group">
      <button type="button" class="dropdown button-standard" data-toggle="dropdown">
        <label>Select one</label>
      </button>
      <div class="dropdown-pane bottom" id="dropdown" data-dropdown>
        <ul class="menu vertical">
          <li><a href="#">List Item 1</a></li>
          <li class="is-hovered"><a href="#">List Item 2</a></li>
          <li><a href="#">List Item 3</a></li>
          <li><a href="#">List Item 4</a></li>
          <li class="has-icon"><a href="#"><i class="check"></i>List Item 5</a></li>
        </ul>
      </div>
    </div>`,
  styleUrls: ['./dropdown.scss']
})
export class AlloyDropdownComponent {
  constructor() {
  }
}
