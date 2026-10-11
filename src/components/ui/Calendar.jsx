'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

// Narrow weekday labels (S M T W T F S), locale-aware.
const WEEKDAY_LABELS = Array.from({ length: 7 }, (_, i) =>
  new Date(2023, 0, i + 1).toLocaleDateString(undefined, { weekday: 'narrow' })
);

/**
 * Minimal month-grid date picker (no external calendar library — this
 * project has none installed and the grid is simple enough to own).
 * Dates before `minDate` (default: today) render disabled.
 */
export function Calendar({ selected, onSelect, minDate }) {
  const floor = startOfDay(minDate || new Date());
  const [viewMonth, setViewMonth] = useState(startOfMonth(selected || floor));

  const firstOfMonth = startOfMonth(viewMonth);
  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
  const leadingBlanks = firstOfMonth.getDay();
  const cells = [...Array.from({ length: leadingBlanks }, () => null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  function changeMonth(delta) {
    setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + delta, 1));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          aria-label="Previous month"
          className="text-paper/60 hover:text-paper cursor-pointer bg-transparent border-0 text-base px-1.5"
        >
          ‹
        </button>
        <div className="text-[13px] tracking-[.1em] uppercase text-paper/80">
          {viewMonth.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
        </div>
        <button
          type="button"
          onClick={() => changeMonth(1)}
          aria-label="Next month"
          className="text-paper/60 hover:text-paper cursor-pointer bg-transparent border-0 text-base px-1.5"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-paper/45 mb-1.5">
        {WEEKDAY_LABELS.map((label, i) => (
          <div key={i}>{label}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={`blank-${i}`} />;
          const date = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day);
          const disabled = date < floor;
          const isSelected = selected && startOfDay(selected).getTime() === date.getTime();
          return (
            <button
              key={day}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(date)}
              className={`text-[13px] h-8 w-8 flex items-center justify-center cursor-pointer transition-colors ${
                isSelected
                  ? 'bg-paper text-ink'
                  : disabled
                    ? 'text-paper/25 cursor-not-allowed'
                    : 'text-paper hover:bg-paper/10'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

Calendar.propTypes = {
  selected: PropTypes.instanceOf(Date),
  onSelect: PropTypes.func.isRequired,
  minDate: PropTypes.instanceOf(Date),
};
