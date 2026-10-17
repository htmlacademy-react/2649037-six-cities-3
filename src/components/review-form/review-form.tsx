import { Fragment, useState, ChangeEvent, FormEvent } from 'react';

type ReviewFormProps = {
  onSubmit: (rating: number, comment: string) => Promise<boolean>;
  isSubmitting: boolean;
  error: string | null;
};

const RATING_TITLES: Record<number, string> = {
  5: 'perfect',
  4: 'good',
  3: 'not bad',
  2: 'badly',
  1: 'terribly',
};

function ReviewForm({ onSubmit, isSubmitting, error }: ReviewFormProps): JSX.Element {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  const isValid =
    rating !== null && comment.length >= 50 && comment.length <= 300;

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  const handleFormSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!isValid || rating === null || isSubmitting) {
      return;
    }

    const success = await onSubmit(rating, comment);

    if (success) {
      setRating(null);
      setComment('');
    }
  };

  return (
    <form className="reviews__form form" onSubmit={(evt) => void handleFormSubmit(evt)}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((star) => {
          const inputId = star === 1 ? '1-star' : `${star}-stars`;

          return (
            <Fragment key={star}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={star}
                id={inputId}
                type="radio"
                checked={rating === star}
                onChange={handleRatingChange}
                disabled={isSubmitting}
              />
              <label
                htmlFor={inputId}
                className="reviews__rating-label form__rating-label"
                title={RATING_TITLES[star]}
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          );
        })}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleCommentChange}
        maxLength={300}
        disabled={isSubmitting}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>

        {error && <p className="reviews__error">{error}</p>}

        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
