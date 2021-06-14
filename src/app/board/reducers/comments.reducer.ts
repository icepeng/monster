import { BoardApiActions } from '@monster/board/actions';
import { Comment } from '@monster/board/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

export const commentsFeatureKey = 'comments';

export interface State extends EntityState<Comment> {}

export const adapter: EntityAdapter<Comment> = createEntityAdapter<Comment>({
  selectId: (comment: Comment) => comment.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState();

export const reducer = createReducer(
  initialState,
  on(BoardApiActions.loadBoardSuccess, (state, { board }) =>
    adapter.setAll(board.comments, state)
  ),
  on(BoardApiActions.addCommentSuccess, (state, { comment }) =>
    adapter.addOne(comment, state)
  ),
  on(BoardApiActions.editCommentSuccess, (state, { comment }) =>
    adapter.updateOne(
      {
        id: comment.id,
        changes: {
          content: comment.content,
        },
      },
      state)
  ),
  on(BoardApiActions.deleteCommentSuccess, (state, { id }) =>
    adapter.removeOne(id, state)
  ),
);
