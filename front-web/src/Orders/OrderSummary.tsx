import { formatPrice } from "./helpers"
import { Product } from "./types"

type Props = {
   amount: number
   totalPrice: number
   selectedProducts: Product[]
   onSubmit: () => void //uma função que retorna void
}

function OrderSummary({ amount, totalPrice, selectedProducts, onSubmit }: Props) {
   return (
      <div className="order-summary-container">
         <div className="order-summary-content">
            <div>
               <span className="amount-selected-container">
                  <strong className="amount-selected">{amount}</strong>
               itens selecionados ({selectedProducts.map(x => x.name + `, `)})
            </span>
               <span className="order-summary-total">
                  Total do pedido:
                  <strong className="amount-selected"> {formatPrice(totalPrice)}</strong>
               </span>
            </div>
            <button 
               className="order-summary-make-order"
               onClick={onSubmit}
            >
               Fazer Pedido
            </button>
         </div>
      </div>
   )
}

export default OrderSummary