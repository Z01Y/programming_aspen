import React, { useState } from 'react';

const periods = [
  { name: 'default', displayName: '默认' },
  { name: 'Q1', displayName: '春季' },
  { name: 'Q2', displayName: '夏季' },
  { name: 'Q3', displayName: '秋季' },
  { name: 'Q4', displayName: '冬季' },
];

const initialParams = [
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
  };

  const cellStyle = highlight ? { backgroundColor: 'yellow' } : {};

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

const Table = () => {
  const [params, setParams] = useState(initialParams); // Manage params state

  const updateParamData = (paramId, periodName, newValue) => {
    const updatedParams = params.map((param) => {
      if (param.id === paramId) {
        const updatedParamData = {
          ...param.periodData,
          [periodName]: newValue,
        };
        return {
          ...param,
          periodData: updatedParamData,
        };
      }
      return param;
    });
    setParams(updatedParams);
  };

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
                  onDoubleClick={() => {}}
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
                    onDoubleClick={() => {}}
                    onChange={(newValue) => {
                      updateParamData(
                        param.id,
                        period.name,
                        parseFloat(newValue)
                      );
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
      <Table />
    </div>
  );
}

export default App;
