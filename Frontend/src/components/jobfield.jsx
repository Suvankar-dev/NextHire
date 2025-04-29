const JobField = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-6 w-[70%] sm:w-full">
      {["Card 1", "Card 2", "Card 3", "Card 4", "Card 5", "Card 6"].map(
        (card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          >
            <h2 className="text-lg font-bold mb-2">{card}</h2>
            <p className="text-gray-600">This is some content for {card}.</p>
          </div>
        )
      )}
    </div>
  );
};
export default JobField;
