import { extend } from 'flarum/extend';
import app from 'flarum/app';
import PostControls from 'flarum/utils/PostControls';
import Button from 'flarum/components/Button';
import CommentPost from 'flarum/components/CommentPost';
import DiscussionPage from 'flarum/components/DiscussionPage';

import StrikeModal from 'Reflar/UserManagement/components/StrikeModal';

export default function() {

    extend(PostControls, 'moderationControls', function(items, post) {
        const discussion = post.discussion();
        const id = post.data.attributes.id;

        if (!discussion.canStrike()) return;

        items.add('serveStrike', [
            m(Button, {
                icon: 'times',
                className: 'refar-usermanagement-strikeButon',
                onclick: () => {
                    app.modal.show(new StrikeModal({id}));
                    
                }
            }, app.translator.trans('reflar-usermanagement.forum.post_controls.strike_button'))
        ]);
    });
}