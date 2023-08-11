import React, { useState, useEffect } from 'react';

const periods = [
  { name: 'default', displayName: '默认' },
  { name: 'Q1', displayName: '春季' },
  { name: 'Q2', displayName: '夏季' },
  { name: 'Q3', displayName: '秋季' },
  { name: 'Q4', displayName: '冬季' },
];

const params = [
  {
    id: '1001',
    name: 'A',
    value: 1,
    periodData: { Q2: 0.9, Q4: 1.1 },
  },
];

const TableCell = ({ value, editable, highlight, onChange, onDoubleClick }) => {
  const [editing, setEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleDoubleClick = () => {
    setEditedValue(value);
    setEditing(true);
    onDoubleClick();
  };

  const handleChange = (event) => {
    setEditedValue(event.target.value);
  };

  const handleBlur = () => {
    setEditing(false);
    onChange(editedValue);
    console.log(editedValue);
  };

  const cellStyle = highlight ? { backgroundColor: 'yellow' } : {};

  useEffect(() => {
    if (!editing) {
      setEditedValue(value);
    }
  }, [value, editing]);

  return (
    <td
      onDoubleClick={editable ? handleDoubleClick : undefined}
      style={cellStyle}
    >
      {editing ? (
        <input
          type="number"
          value={editedValue}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ) : (
        value
      )}
    </td>
  );
};

const Table = ({ params }) => {
  const [editingSeason, setEditingSeason] = useState(null);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>参数名</th>
            <th>季节</th>
            <th>值</th>
          </tr>
        </thead>
        <tbody>
          {params.map((param) => (
            <React.Fragment key={param.id}>
              <tr>
                <td>{param.name}</td>
                <td>{periods[0].displayName}</td>
                <TableCell
                  value={param.value}
                  editable={false}
                  onDoubleClick={() => setEditingSeason(periods[0].name)}
                />
              </tr>
              {periods.slice(1).map((period) => (
                <tr key={`${param.id}-${period.name}`}>
                  <td>{param.name}</td>
                  <td>{period.displayName}</td>
                  <TableCell
                    value={param.periodData[period.name] || param.value}
                    editable={period.name !== 'default'}
                    highlight={param.periodData[period.name] !== undefined}
                    onDoubleClick={() => setEditingSeason(period.name)}
                    onChange={(newValue) => {
                      param.periodData[period.name] = parseFloat(newValue);
                    }}
                  />
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Table params={params} />
    </div>
  );
}

export default App;
