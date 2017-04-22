countdown();
blastOff();
mainEngineCutoff();

function countdown() {
  console.log('5');
  console.log('4');
  console.log('3');
  console.log('2');
  console.log('1');
}

$.getJSON('gimme/my/json.json', (data) => {
  console.log(data);
});

const foo = { secret: 5 };

const reveal = (obj) => obj.secret;
reveal(foo) // 5

myFunc = data => console.log(data);

function() {
  this.myVariable = 5;
  $('element').onClick(function() {
    console.log(this.myVariable); // Not gonna output 5
  });
  $('element').onClick(() => {
    this.myVariable // 5
  });
}
