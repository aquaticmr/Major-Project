// src/features/budgetPlanner/BudgetReport.jsx
import React, { useRef } from 'react';

const BudgetReport = ({ report, loading, isInitialized, error, modelUsedForInit }) => {
  const reportRef = useRef(null); // Create a ref for the report content

  const formatReport = (reportText) => {
    if (!reportText) return null;

    const lines = reportText.split('\n').filter(line => line.trim() !== '');
    const formattedElements = [];
    let currentList = null;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      if (line.startsWith('# ')) {
        formattedElements.push(<h3 key={i} className="text-xl font-semibold text-gray-800 mb-2">{line.substring(2)}</h3>);
        currentList = null;
      } else if (line.startsWith('### ')) {
        formattedElements.push(<h4 key={i} className="text-lg font-semibold text-gray-700 mt-4 mb-2">{line.substring(4)}</h4>);
        currentList = null;
      } else if (line.startsWith('* ')) {
        const listItemText = line.substring(2);
        const formattedListItem = formatTextWithBold(listItemText);

        if (!currentList || currentList.type !== 'ul') {
          currentList = { type: 'ul', items: [] };
          formattedElements.push(<ul key={`ul-${formattedElements.length}`} className="list-disc ml-6 space-y-1"></ul>);
        }
        currentList.items.push(<li key={`${i}-li`} dangerouslySetInnerHTML={{ __html: formattedListItem }} />);

      } else if (/^\d+\.\s/.test(line)) {
        const listItemText = line.replace(/^\d+\.\s/, '');
        const formattedListItem = formatTextWithBold(listItemText);

        if (!currentList || currentList.type !== 'ol') {
          currentList = { type: 'ol', items: [] };
          formattedElements.push(<ol key={`ol-${formattedElements.length}`} className="list-decimal ml-6 space-y-1"></ol>);
        }
        currentList.items.push(<li key={`${i}-li`} dangerouslySetInnerHTML={{ __html: formattedListItem }} />);

      } else if (line.startsWith('***Disclaimer:')) {
        formattedElements.push(<div key={i} className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-600 italic">{line.substring('***Disclaimer:'.length).trim()}</div>);
        currentList = null;
      } else {
        const formattedParagraph = formatTextWithBold(line);
        formattedElements.push(<p key={i} className="text-gray-700 mb-2" dangerouslySetInnerHTML={{ __html: formattedParagraph }} />);
        currentList = null;
      }

      if (currentList && (i === lines.length - 1 || !(lines[i + 1].startsWith('* ') || /^\d+\.\s/.test(lines[i+1])))) {
        const listElement = formattedElements.pop();
        if (listElement) {
          const listItems = currentList.items;
          const updatedListElement = React.cloneElement(listElement, {}, listItems);
          formattedElements.push(updatedListElement);
        }
        currentList = null;
      }
    }

    return <div className="space-y-4">{formattedElements}</div>;
  };

  const formatTextWithBold = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  const handleExportPdf = () => {
    // Fallback to native print dialog which allows saving as PDF
    window.print();
  };


  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Your AI Budget Report</h2>
        <button
          onClick={handleExportPdf}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Export to PDF
        </button>
      </div>
      {isInitialized && modelUsedForInit && (
        <p className="text-xs text-gray-500 text-center mb-4">
          Using AI Model: IBM AI
        </p>
      )}
      <div className="prose prose-sm sm:prose lg:prose-lg max-w-none min-h-[200px] text-gray-700" ref={reportRef}> {/* Add ref to this div */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
            <p className="ml-3 text-gray-600">Generating report...</p>
          </div>
        ) : report ? (
          formatReport(report)
        ) : (
          <div className="text-gray-500 italic text-center py-12">
            {isInitialized ? 'Enter your details above and click "Generate Budget Plan" to see your personalized report.' : error ? 'Could not initialize AI. See error message above.' : 'Initializing AI or waiting for API key...'}
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetReport;
