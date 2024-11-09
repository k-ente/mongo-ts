// src/utils/validation.ts
export const validateProduct = (data: any) => {
    const errors: Record<string, string> = {}
  
    if (!data.name?.trim()) {
      errors.name = '商品名は必須です'
    }
  
    if (!data.price || data.price < 0) {
      errors.price = '有効な価格を入力してください'
    }
  
    if (!data.description?.trim()) {
      errors.description = '商品説明は必須です'
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }
  
  