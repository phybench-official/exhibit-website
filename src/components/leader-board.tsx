export default function LeaderBoard() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-16 mb-8 px-4">
      <div className="flex flex-col items-center">
        <div className="w-full mb-6">
          <img 
            src="/images/test_example.jpg" 
            className="w-full h-auto object-cover rounded-lg shadow-lg" 
            alt="PHYBench示例图"
          />
        </div>
        <div className="text-xl text-center text-gray-800 dark:text-gray-200 max-w-3xl">
          <span className="font-bold text-blue-600 dark:text-blue-400">PHYBench</span> is a benchmark for evaluating the physical reasoning capabilities of large language models.
        </div>
      </div>
    </div>
  )
}