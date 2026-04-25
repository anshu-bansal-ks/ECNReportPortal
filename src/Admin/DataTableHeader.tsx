
interface HeaderProps {
  displayCount: number;
  setDisplayCount: (count: number) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const DataTableHeader = ({ displayCount, setDisplayCount, searchTerm, setSearchTerm }: HeaderProps) => {
  return (
    <div className="flex justify-between items-center p-2 bg-[#eff3f8] border border-b-0 border-gray-300 w-full animate-in fade-in">
      {/* Left side: Display count */}
      <div className="flex items-center gap-2 text-[13px] text-[#393939]">
        <span>Display</span>
        <select 
          value={displayCount}
          onChange={(e) => setDisplayCount(Number(e.target.value))}
          className="border border-gray-300 rounded bg-white p-1 outline-none focus:border-blue-400"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <span>records</span>
      </div>

      {/* Right side: Search */}
      <div className="flex items-center gap-2 text-[13px] text-[#393939]">
        <span>Search:</span>
        <div className="relative">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded p-1 px-2 outline-none focus:border-blue-400 bg-white w-40 sm:w-64 transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default DataTableHeader;