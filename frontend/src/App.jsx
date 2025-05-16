import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(null);
  const [operation, setOperation] = useState(null);
  const [clearNext, setClearNext] = useState(false);
  const [history, setHistory] = useState([]);

  const appendToDisplay = (value) => {
    if (display === '0' || clearNext) {
      setDisplay(value);
      setClearNext(false);
    } else {
      setDisplay(display + value);
    }
  };

  const handleNumberInput = (num) => {
    appendToDisplay(num);
  };

  const handleDecimal = () => {
    if (clearNext) {
      setDisplay('0.');
      setClearNext(false);
      return;
    }
    
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op) => {
    const current = parseFloat(display);
    
    if (memory === null) {
      setMemory(current);
    } else if (operation) {
      const result = calculate(memory, current, operation);
      setMemory(result);
      setDisplay(String(result));
      setHistory([...history, `${memory} ${operation} ${current} = ${result}`]);
    }
    
    setClearNext(true);
    setOperation(op);
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : 'Error';
      default: return b;
    }
  };

  const handleEquals = () => {
    if (memory === null || operation === null) return;
    
    const current = parseFloat(display);
    const result = calculate(memory, current, operation);
    
    setDisplay(String(result));
    setHistory([...history, `${memory} ${operation} ${current} = ${result}`]);
    setMemory(null);
    setOperation(null);
    setClearNext(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setClearNext(false);
  };

  const handleAllClear = () => {
    setDisplay('0');
    setMemory(null);
    setOperation(null);
    setClearNext(false);
  };

  const handleBackspace = () => {
    if (display.length === 1 || (display.length === 2 && display.includes('-'))) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handleToggleSign = () => {
    setDisplay(display.charAt(0) === '-' ? display.slice(1) : '-' + display);
  };

  const handlePercent = () => {
    const current = parseFloat(display);
    const result = current / 100;
    setDisplay(String(result));
  };

  const Button = ({ value, onClick, className = '' }) => (
    <button
      onClick={onClick}
      className={`flex items-center justify-center rounded-lg text-lg font-medium shadow-md transition-colors
        ${className || 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
    >
      {value}
    </button>
  );

  return (
    <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 p-6 max-w-6xl mx-auto">
      <div className="bg-gray-900 rounded-xl shadow-xl p-6 w-full md:w-1/2 lg:w-1/3">
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <div className="text-right">
            {operation && (
              <div className="text-gray-400 text-sm h-6">
                {memory} {operation}
              </div>
            )}
            <div className="text-white text-3xl font-medium truncate">{display}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          <Button 
            value="AC" 
            onClick={handleAllClear} 
            className="bg-red-500 hover:bg-red-600 text-white"
          />
          <Button 
            value="C" 
            onClick={handleClear} 
            className="bg-red-400 hover:bg-red-500 text-white"
          />
          <Button 
            value="⌫" 
            onClick={handleBackspace} 
            className="bg-gray-700 hover:bg-gray-600 text-white"
          />
          <Button 
            value="÷" 
            onClick={() => handleOperation('÷')} 
            className={`bg-amber-500 hover:bg-amber-600 text-white ${operation === '÷' ? 'ring ring-white' : ''}`}
          />
          
          <Button value="7" onClick={() => handleNumberInput('7')} />
          <Button value="8" onClick={() => handleNumberInput('8')} />
          <Button value="9" onClick={() => handleNumberInput('9')} />
          <Button 
            value="×" 
            onClick={() => handleOperation('×')} 
            className={`bg-amber-500 hover:bg-amber-600 text-white ${operation === '×' ? 'ring ring-white' : ''}`}
          />
          
          <Button value="4" onClick={() => handleNumberInput('4')} />
          <Button value="5" onClick={() => handleNumberInput('5')} />
          <Button value="6" onClick={() => handleNumberInput('6')} />
          <Button 
            value="-" 
            onClick={() => handleOperation('-')} 
            className={`bg-amber-500 hover:bg-amber-600 text-white ${operation === '-' ? 'ring ring-white' : ''}`}
          />
          
          <Button value="1" onClick={() => handleNumberInput('1')} />
          <Button value="2" onClick={() => handleNumberInput('2')} />
          <Button value="3" onClick={() => handleNumberInput('3')} />
          <Button 
            value="+" 
            onClick={() => handleOperation('+')} 
            className={`bg-amber-500 hover:bg-amber-600 text-white ${operation === '+' ? 'ring ring-white' : ''}`}
          />
          
          <Button 
            value="±" 
            onClick={handleToggleSign} 
            className="bg-gray-300 hover:bg-gray-400"
          />
          <Button value="0" onClick={() => handleNumberInput('0')} />
          <Button value="." onClick={handleDecimal} />
          <Button 
            value="=" 
            onClick={handleEquals} 
            className="bg-green-500 hover:bg-green-600 text-white"
          />
        </div>
      </div>
      
      <div className="bg-gray-100 rounded-xl shadow-lg p-6 w-full md:w-1/2 lg:w-2/3">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Calculation History</h2>
        <div className="bg-white rounded-lg p-4 h-96 overflow-y-auto">
          {history.length === 0 ? (
            <p className="text-gray-500 italic">No calculations yet</p>
          ) : (
            <ul className="space-y-2">
              {history.map((item, index) => (
                <li key={index} className="border-b pb-2">
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}