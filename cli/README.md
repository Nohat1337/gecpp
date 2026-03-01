# GEC++ Secure Kernel Compiler

A high-performance, secure-by-default compiler for kernel development.

## Installation (Linux x86-64)
1.  **Clone/Download** the project.
2.  **Install**:
    ```bash
    sudo make install
    ```

## CLI Usage
The `gecpp` command is your primary interface.

### Basic Compilation
```bash
gecpp main.gecpp
```
Produces `main.js` (executable via GEC++ runtime).

### Optimization (-O2)
Enable high-level optimizations (minification, comment stripping, etc.):
```bash
gecpp -O2 main.gecpp
```

### Compile and Run
Compile and execute immediately without saving the output file:
```bash
gecpp -r main.gecpp
```

### Custom Output
```bash
gecpp -o my_kernel.bin main.gecpp
```

## Syntax Overview
- `fn`: Function declaration.
- `let` / `let mut`: Immutability by default.
- `panic!()`: Kernel halt.
- `audit!{}`: Security logging.
- `alloc()`: Secure memory allocation.
