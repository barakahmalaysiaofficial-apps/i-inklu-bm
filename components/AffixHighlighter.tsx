
import React from 'react';

interface Props {
  text: string;
  isDyslexiaMode?: boolean;
}

const AffixHighlighter: React.FC<Props> = ({ text, isDyslexiaMode }) => {
  // Common BM affixes
  // Prefixes: meN-, ber-, ter-, di-, ke-, peN-, se-
  // Suffixes: -an, -kan, -i
  const affixes = [
    'mem', 'men', 'meng', 'meny', 'me', 
    'ber', 'bel', 'be', 
    'ter', 'te', 
    'di', 'ke', 
    'pem', 'pen', 'peng', 'peny', 'pe', 
    'se'
  ];
  const suffixes = ['kan', 'an', 'i'];

  const highlightText = (input: string) => {
    const words = input.split(/\s+/);
    
    return words.map((word, idx) => {
      let current = word.toLowerCase().replace(/[.,!?;:]/g, '');
      let prefixMatch = '';
      let suffixMatch = '';
      let root = word;

      // Simplistic affix matching for UI purposes
      for (const p of affixes) {
        if (current.startsWith(p) && current.length > p.length + 2) {
          prefixMatch = word.substring(0, p.length);
          root = word.substring(p.length);
          current = root.toLowerCase();
          break;
        }
      }

      for (const s of suffixes) {
        if (current.endsWith(s) && current.length > s.length + 2) {
          suffixMatch = word.substring(word.length - s.length);
          root = word.substring(prefixMatch ? prefixMatch.length : 0, word.length - s.length);
          break;
        }
      }

      return (
        <span key={idx} className="mr-1.5 inline-block mb-1">
          {prefixMatch && <span className="text-indigo-600 font-bold border-b-2 border-indigo-200">{prefixMatch}</span>}
          <span>{root}</span>
          {suffixMatch && <span className="text-emerald-600 font-bold border-b-2 border-emerald-200">{suffixMatch}</span>}
        </span>
      );
    });
  };

  return (
    <div className={`text-xl text-slate-800 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 ${isDyslexiaMode ? 'dyslexia-font' : ''}`}>
      {highlightText(text)}
    </div>
  );
};

export default AffixHighlighter;
