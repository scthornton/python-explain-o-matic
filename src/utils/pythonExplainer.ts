
/**
 * Adds explanations to Python code
 */
export const explainPythonCode = (code: string): string => {
  // Split code into lines
  const lines = code.split('\n');
  const result: string[] = [];
  
  let inFunction = false;
  let inClass = false;
  let indentLevel = 0;
  let lastIndentLevel = 0;
  
  // Process each line
  lines.forEach((line, index) => {
    // Add the original line
    result.push(line);
    
    // Skip empty lines or comment-only lines
    if (!line.trim() || line.trim().startsWith('#')) {
      return;
    }
    
    // Calculate current indentation level
    const currentIndent = line.length - line.trimLeft().length;
    const currentIndentLevel = Math.floor(currentIndent / 4);
    
    // Check if indent level has decreased
    if (currentIndentLevel < lastIndentLevel) {
      indentLevel = currentIndentLevel;
      if (inFunction && currentIndentLevel < lastIndentLevel) {
        inFunction = false;
      }
      if (inClass && currentIndentLevel < lastIndentLevel) {
        inClass = false;
      }
    }
    
    lastIndentLevel = currentIndentLevel;
    
    // Detect and explain different Python constructs
    const trimmed = line.trim();
    const indent = ' '.repeat(currentIndent);
    
    if (trimmed.startsWith('def ')) {
      // Function definition
      const functionName = trimmed.substring(4, trimmed.indexOf('(')).trim();
      const params = trimmed.substring(trimmed.indexOf('(') + 1, trimmed.indexOf(')')).trim();
      
      result.push(
        `${indent}# This function '${functionName}' ${params ? `takes parameters (${params}) and` : ''} defines a reusable block of code`
      );
      inFunction = true;
      indentLevel = currentIndentLevel;
    }
    else if (trimmed.startsWith('class ')) {
      // Class definition
      const className = trimmed.substring(6, trimmed.includes('(') ? trimmed.indexOf('(') : trimmed.indexOf(':')).trim();
      
      result.push(
        `${indent}# This class '${className}' defines a blueprint for creating objects`
      );
      inClass = true;
      indentLevel = currentIndentLevel;
    }
    else if (trimmed.startsWith('if ')) {
      // If statement
      const condition = trimmed.substring(3, trimmed.indexOf(':')).trim();
      result.push(
        `${indent}# This conditional checks if ${condition} is True and executes the indented code if so`
      );
    }
    else if (trimmed.startsWith('elif ')) {
      // Elif statement
      const condition = trimmed.substring(5, trimmed.indexOf(':')).trim();
      result.push(
        `${indent}# This is an alternative condition that's checked if previous conditions were False`
      );
    }
    else if (trimmed.startsWith('else:')) {
      // Else statement
      result.push(
        `${indent}# This code runs when none of the above conditions were True`
      );
    }
    else if (trimmed.startsWith('for ')) {
      // For loop
      const loopDef = trimmed.substring(4, trimmed.indexOf(':')).trim();
      result.push(
        `${indent}# This loop iterates over ${loopDef.split(' in ')[1]} and executes the indented code for each item`
      );
    }
    else if (trimmed.startsWith('while ')) {
      // While loop
      const condition = trimmed.substring(6, trimmed.indexOf(':')).trim();
      result.push(
        `${indent}# This loop continues executing while ${condition} remains True`
      );
    }
    else if (trimmed.startsWith('import ') || trimmed.startsWith('from ')) {
      // Import statement
      result.push(
        `${indent}# This imports external code/libraries to use their functionality`
      );
    }
    else if (trimmed.startsWith('try:')) {
      // Try statement
      result.push(
        `${indent}# This attempts to execute the indented code and catches exceptions if they occur`
      );
    }
    else if (trimmed.startsWith('except ')) {
      // Except statement
      const exceptionType = trimmed.substring(7, trimmed.indexOf(':')).trim();
      result.push(
        `${indent}# This handles ${exceptionType} exceptions that might occur in the try block`
      );
    }
    else if (trimmed.startsWith('with ')) {
      // With statement
      const context = trimmed.substring(5, trimmed.indexOf(':')).trim();
      result.push(
        `${indent}# This creates a context manager for ${context} that handles setup/cleanup automatically`
      );
    }
    else if (trimmed.includes('=') && !trimmed.includes('==')) {
      // Variable assignment
      const varName = trimmed.split('=')[0].trim();
      const varValue = trimmed.split('=')[1].trim();
      result.push(
        `${indent}# This assigns the value ${varValue} to the variable '${varName}'`
      );
    }
    else if (trimmed.endsWith('()') || (trimmed.includes('(') && trimmed.includes(')'))) {
      // Function calls
      const funcName = trimmed.substring(0, trimmed.indexOf('(')).trim();
      result.push(
        `${indent}# This calls the function '${funcName}' to execute its code`
      );
    }
  });
  
  return result.join('\n');
};
