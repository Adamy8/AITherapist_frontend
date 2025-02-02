"use client"
import GraphSection from "./graph";
import TextComment from "./textcomment";


const DisplayPage = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar (left) */}
            <div className="w-16 bg-gray-800 text-white flex flex-col items-center p-4 h-screen">
            {/* Sidebar content (buttons or links) */}
            <a href="/notes" className="text-white font-semibold">Go to Notes</a>
            {/* You can add more buttons or links here in the future */}
            </div>
                <div className="flex-1 flex flex-col">     {/* Main content (flex container) */}
                    <div className="flex-1 flex flex-col md:flex-row overflow-auto">
                        {/* Left content (top-left) */}
                        <div className="flex-1 p-4 border-r border-gray-300 overflow-auto">
                            <GraphSection />
                        </div>
                
                        {/* Right content (top-right) */}
                        <div className="flex-1 p-4 overflow-auto">
                            <TextComment />
                        </div>
                    </div>
            
                    {/* Bottom content */}
                    <div className="h-2/5 bg-gray-100 p-4 overflow-auto">
                    <h2 className="font-bold">Bottom Content</h2>
                    <p>This section takes up 1/3 of the screen height and is scrollable on small screens.</p>
                    </div>
                </div>
        </div>
    );
  };
  
  export default DisplayPage;
  