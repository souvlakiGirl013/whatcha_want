import React, { useRef, useState, useEffect } from 'react';

const Canvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [tool, setTool] = useState('pencil'); // State to track current tool

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'square';
    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 10;
    setContext(ctx);
  }, []);

  const startDrawing = (e) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    context.beginPath(); // Prevents lines from connecting
  };

  const draw = (e) => {
    if (!isDrawing) return;

    // Get mouse position relative to the canvas
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / 10) * 10;
    const y = Math.floor((e.clientY - rect.top) / 10) * 10;

    context.fillStyle = tool === 'pencil' ? 'orange' : 'white';
    context.fillRect(x, y, 16, 16); // Draw 16x16 squares
  };

  const clearCanvas = () => {
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const selectTool = (selectedTool) => {
    setTool(selectedTool);
  };

  return (
    <div>
      <div className='buttons'>
        <button className='pencil' onClick={() => selectTool('pencil')}>draw me</button>
        <p> or </p>
        <button className='eraser' onClick={() => selectTool('eraser')}>erase me</button>
        <p> and you can always </p>
        <button className='clear' onClick={clearCanvas}></button>
        <p> &#40;start again&#41; </p>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onMouseLeave={stopDrawing}
        style={{cursor: tool === 'pencil' ? 'crosshair' : 'default' }}
      />
    </div>
  );
};

export default Canvas;
