Template.body.events({
    'click [data-action=create]': function () {
        Posts.insert({
            title: Fake.sentence(5),
            content: [
                Fake.paragraph(10),
                Fake.paragraph(5),
            ]
        });
    },
    'click [data-action=remove]': function () {
        Posts.remove({ _id: this._id });
    },
});

Template.body.helpers({
    posts: function () {
        return Posts.find();
    }
});

