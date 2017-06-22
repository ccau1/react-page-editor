export default {
  elements: {},
  addElements: function(elements: Object) {
    Object.keys(elements).forEach(name => {
      this.addElement(name, elements[name]);
    });
  },
  addElement: function(name: string, element: Object) {
    this.elements[name] = element;
  },
  getElements: function() {
    return this.elements;
  }
};
