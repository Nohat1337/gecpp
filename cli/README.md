# GEC++ Compiler Installation

## Prerequisites
- Node.js (v18+)
- npm

## Build from Source
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gecpp-kernel.git
   cd gecpp-kernel/cli
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the x86-64 Linux binary:
   ```bash
   npm run build-linux
   ```

4. Install globally:
   ```bash
   sudo mv bin/gecpp /usr/local/bin/
   ```

## Usage
Create a file `main.gecpp`:
```rust
fn main() {
    out << "Hello from GEC++ Kernel!" << endl;
    audit! { System initialized }
}
main();
```

Run it:
```bash
gecpp main.gecpp
```
