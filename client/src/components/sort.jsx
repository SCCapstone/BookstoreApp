const decimalNumber = (price) => {
  var result = price - Math.floor(price) !== 0;
  if (result) {
    price = price.toString();
    price = price.slice(price.indexOf(".") + 1, price.length);
    return Number(price);
  } else {
    return;
  }
};

const wholeNumber = (price) => {
  price = price.toString();
  price = price.slice(0, price.indexOf("."));
  return Number(price);
};

const sort = (books, selection) => {
  var books_changed = [];

  switch (selection) {
    case "Best Selling":
      books_changed = books.sort(function (a, b) {
        return Number(b.quantitySold) - Number(a.quantitySold);
      });
      break;
    case "New Arrivals":
      books_changed = books.sort(function (a, b) {
        return (b.dateAdded > a.dateAdded) ? 1 : -1;
      });
      break;
    case "Price: low to high":
      books_changed = books.sort(function (a, b) {
        return a.price - b.price;
      });
      break;
    case "Price: high to low":
      books_changed = books.sort(function (a, b) {
        return b.price - a.price;
      });
      break;
    default:
      books_changed = books;
      break;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-2 sm:max-w-[500px] md:max-w-[700px] lg:max-w-[1000px] max-w-[1150px]">
      {books_changed.map((book) => (
        <div
          key={book}
          className="border-2 border-gainsboro hover:border-black"
        >
          <a href={`/${book.author}/${book.title}/`}>
            <img src={book.imageId} alt="" className="row-span-2" />
            <div class="text-lg">{book.title}</div>
            <div class="felx items-end">by: {book.author}</div>

            <div>${book.price}</div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default sort;
