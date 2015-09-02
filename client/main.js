Template.body.onRendered(function() {
    var container = this.$('.ui.page.grid')[0];
    container._uihooks = {
        insertElement: function(node, next) {
            var $node = $(node);
            container.insertBefore(node, next);
            // can't use Meteor.setTimeout here because
            // it will complain about setting timeouts
            // inside simulations ...
            setTimeout(function() {
                $node.addClass('visible');
            }, 10);
        },
        removeElement: function(node) {
            var $node = $(node);
            $node.removeClass('visible');
            setTimeout(function() {
                $node.remove();
            }, 1000);
        },
    };
});

Template.body.events({
    'click [data-action=create]': function() {
        Posts.insert({
            title: Fake.sentence(5),
            content: [
                Fake.paragraph(10),
                Fake.paragraph(5),
            ],
            createdAt: new Date(),
        });
    },
    'click [data-action=remove]': function() {
        Posts.remove({
            _id: this._id
        });
    },
});

Template.body.helpers({
    posts: function() {
        return Posts.find({}, { sort: { createdAt: -1 }});
    }
});