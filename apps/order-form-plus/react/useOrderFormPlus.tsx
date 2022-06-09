import axios from 'axios'
import { DEFAULT_ORDER_FORM } from '@vtex/order-manager'
import { OrderForm } from 'vtex.order-manager'
import { usePixel } from 'vtex.pixel-manager'

interface IUseOrderFormPlus {
  resetOrderForm: () => void
}

/**
 * React custom hook to reset the order form.
 *
 * @returns Returns an object with a hook to reset the order form.
 *
 * @example
 * Here's an example of use:
 * ```
 * import { useOrderFormPlus } from 'cx.order-form-plus'
 *
 * function MyFunc(): void {
 *  const { resetOrderForm } = useOrderFormPlus()
 *  resetOrderForm()
 * }
 * ```
 *
 * @public
 */
function useOrderFormPlus(): IUseOrderFormPlus {
  const { push } = usePixel()
  const { orderForm, setOrderForm } = OrderForm.useOrderForm()

  const resetOrderForm = (): void => {
    axios.post(
      `/api/checkout/pub/orderForm/${orderForm.id}/items/removeAll`,
      {}
    )

    const cleanOrderForm = DEFAULT_ORDER_FORM

    cleanOrderForm.id = orderForm.id
    cleanOrderForm.value = orderForm.value

    setOrderForm(cleanOrderForm)

    push({ id: 'removeAllFromCart' })
  }

  return { resetOrderForm }
}

export default useOrderFormPlus
