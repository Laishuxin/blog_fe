;(function () {
  function Calculator(dom) {
    var inputs = dom.getElementsByTagName('input');
    this.oCalculator = dom;
    this.oFirstInput = inputs[0];
    this.oSecondInput = inputs[1];
    this.oResult = dom.getElementsByClassName('result')[0];
    
    this.init();
  }

  Calculator.prototype.init = function () {
    this.bindEvent();
  }
  
  Calculator.prototype.bindEvent = function () {
    this.oCalculator.addEventListener('click', this.handleClick.bind(this));
  }
  
  Calculator.prototype.handleClick = function (ev) {
    var e = ev || window.event;
    var target = ev.target || e.srcElement;
    var targetName = target.tagName.toLowerCase();

    if (targetName === 'button') {
      var field = target.getAttribute('data-field');
      var var1 = Number(this.oFirstInput.value) || 0;
      var var2 = Number(this.oSecondInput.value) || 0;
      var result = this.calculate(field, var1, var2);
      this.oResult.innerHTML = result;
    }
  }
  
  Calculator.prototype.calculate = function (field, var1, var2) {
    switch (field) {
      case 'plus':
        return var1 + var2;
      case 'minus':
        return var1  - var2;
      case 'mul':
        return var1 * var2;
      case 'div':
        return var2 === 0 ? 0 : var1 / var2;
    }
  }
  window.Calculator = Calculator;
})();