declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveClass(className: string): R;
      toHaveText(text: string): R;
      toContainText(text: string): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveProperty(prop: string, value?: any): R;
    }
  }
}

export {};
