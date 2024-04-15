function StarRating({ rating, onRate }) {
  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <span
            key={ratingValue}
            style={{
              cursor: 'pointer',
              color: ratingValue <= rating ? 'yellow' : 'gray',
            }}
            onClick={() => onRate(ratingValue)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}
export default StarRating;
