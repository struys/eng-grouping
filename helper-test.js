QUnit.test('meetsConstraints test not all members on same team', function(assert) {
    var groups = [[
        ['user1', 'A'],
        ['user2', 'A'],
        ['user3', 'A']
    ]];

    assert.equal(meetsConstraints(groups), false);

    var groups = [[
        ['user1', 'A'],
        ['user2', 'A'],
        ['user3', 'B']
    ]];

    assert.equal(meetsConstraints(groups), true);
});


QUnit.test('convertToGroups test simple groups', function(assert) {
    assert.deepEqual(
        convertToGroups(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']),
        [['A', 'B', 'C', 'D', 'E'], ['F', 'G', 'H', 'I', 'J'], ['K', 'L']]
    );
});

QUnit.test('convertToGroups test single engineer in group', function(assert) {
    assert.deepEqual(
        convertToGroups(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']),
        [['A', 'B', 'C', 'D', 'E'], ['F', 'G', 'H', 'I', 'J', 'K']]
    );
});

QUnit.test("generateUniqueGrouping test many large groups", function(assert) {
   var stub = sinon.stub(Math, 'random').returns(0.1);

   var result = generateUniqueGrouping(null, [
        ['u1', 'A', 'Manager'],
        ['u2', 'B', 'Tech Lead'],
        ['u3', 'C', 'Tech Lead'],
        ['u4', 'D', 'Manager'],
        ['u5', 'E', 'Manager'],
        ['u6', 'F', 'Tech Lead'],
        ['u7', 'G', 'Tech Lead'],
        ['u8', 'H', 'Manager'],
        ['u9', 'I', 'Manager'],
        ['u10', 'J', 'Tech Lead'],
        ['u11', 'K', 'Tech Lead'],
        ['u12', 'L', 'Manager'],
        ['u13', 'M', 'Manager'],
        ['u14', 'N', 'Tech Lead'],
        ['u15', 'O', 'Tech Lead'],
        ['u16', 'P', 'Manager'],
   ]);

   assert.deepEqual(result, [
    [
        'u4', 'u5', 'u8', 'u9', 'u12'
    ],
    [
        'u13', 'u16', 'u1'
    ],
    [
        'u3', 'u6', 'u7', 'u10', 'u11'
    ],
    [
        'u14', 'u15', 'u2'
    ]
   ]);

   stub.restore()
});


QUnit.test("generateUniqueGrouping test small groups", function(assert) {
   var stub = sinon.stub(Math, 'random').returns(0.1);

   var result = generateUniqueGrouping(null, [
        ['u1', 'A', 'Manager'],
        ['u2', 'B', 'Tech Lead'],
        ['u3', 'C', 'Tech Lead'],
        ['u4', 'D', 'Manager'],
   ]);

   assert.deepEqual(result, [
    [
        'u4', 'u1'
    ],
    [
        'u3', 'u2'
    ],
   ]);

   stub.restore()
});

QUnit.test('getFirstThursdayNextMonth', function(assert) {
    var now = new Date('1/1/2016');

    assert.deepEqual(
        getFirstThursdayNextMonth(now),
        new Date('2/4/2016')
    )
});