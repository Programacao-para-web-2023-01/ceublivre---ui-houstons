"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import process from "process";
import Link from 'next/link';
import NumberInput from './NumberInput';
import TrashButton from './TrashButton'

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fab, fas)

interface Item {
  product: number;
  quantity: number;
}

interface UserOrder {
  items: Item[];
  key: string;
  user: number;
}

export default function Cart() {

  const [userOrder, setUserOrder] = useState<UserOrder|null>(null);
  
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_URL;
    const user = localStorage.getItem('inputValue');

    fetch(`${apiUrl}/cart/user/${user}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data:UserOrder) => setUserOrder(data))
  }, []);

  return (
    <div className="cart-overlay">
      <div className="cart-window">
        <h2 className='cart-title'>Seus itens</h2>
        
        <div className="fridge-items-container">
          {userOrder && userOrder.items.map((item, index) => (
            <div className="fridge-item" key={index}>
              <Image className="item-img" src={'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSEhMVFhUXFxUYFRUXFRUVFxcVFRUWFhYVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGi0lHSUtKy0tLS0tLS0tLS0tLSstLS0tLi0tLS0tLS0tLS0tMC0tLS0tLS0tLS0tLS0tLS0tL//AABEIAOEA4AMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAwECBAUGBwj/xABGEAACAQICBQcHCAkEAwEAAAAAAQIDEQQhBRIxQVEGE2FxgZHRIjKCobHB8AcjM0JicpKyFjRSU1SiwtLhFCRjk3Oj8Rf/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQIDBQQG/8QAKxEBAAICAAUEAQMFAQAAAAAAAAECAxEEEjEycRQhQVEzYYGxIiNSkfAT/9oADAMBAAIRAxEAPwD2wAFFgAAAAAAAAAtqVFHNtLrYRM66ripqdI6bjCLcVrPuXWfP/L3T+lKGkKkoYrERTtKmoVJ83qSWSVNPVsrNWtuNf/G3LzTDKM9LW5Yl9Kg+Z9H/AC0aUpK050q3/kpJPvpuJtofLzjN+Gw7/wCxf1Gemr6CB4B/+9Yv+Fw/fU8Syr8vON+rhsMuvnH/AFIaH0EVPmPSXymaYxi1ITdJPbzEOa/9jbkuxo7b5LtOYrD05/6mpOtF1Nk6kqjVkruEpdLtbZdM0phtboyyZ6Y+6XsoMXB6Qp1EnGW3c8nn0GUZzExOpaVtFo3EgAIWAAAAAAAAAAAAAAA1ultLKl5Kzm925Li/AmtZtOoUvetI5rdGxlJJXbsuLMDEaYgso3k+jJd5zlXFTqO85N+xdS2FFI9lOF/yc3Jx8z7UhtK2laktloro295iud827vizHTKxZ6a4616PFfLa/dKuJjrJpfD2o5TlVornaaqwV507prfKD85daauu1bzr4p/HSY+Io/Wis9649K6S8fTPpO3kFTDQlm4xfWkzEq6MorPm4dkF7EjuOUHJ6962HV27udLZd75Q4S4x39D28jKfg1saa2prc+gpesT7PRjvMe8dGJTwFG/0UOOdNbnbejPoYeEdkYrqil7CFSMvR+FqVpalNXf1pPzYrjJ+7a/WVpXlWy3m8JKFGU5KnT86XdGO+cuhet2R1+CwMU4UoebFZva3+1J9LfrZbonk/wA2mot3l58350v7Yrgb7C4aNNWVr72bdPd5rTv2joyKUOO0zaGkKkNkrrg814owb33tlZ5b+zeUtWLdVqXtX3idN9h9OReU4uPSs14o2dKtGSvFproZxmsWKrKL1oycXxTPNfhYnte3Hx9o7vd3INJoXTnONU6llPc9il0dDN2eO9JrOpdLHkrkrzVAAVaAAAAAAAAMfSOLVKnKo/qrJcXsS77HBc+5ScpO7bu30m65a43OFFcNd9ObUV+Y5ylLJvg8zocLTVeZx+Py81+SOkNjGRNTVzVTr2a4PLtNjTmj1PBDITJIsjXEuuVWT6ysI3WazI47GViiErMThb3lGyfqfX09Jy2ndA069206dZfXSvfgprZNdO3gzsHIx69NSyl/86iYn4k6TuHlmH0U1XVHEyVG/myveNXopSatfinmuD2noGjsDCnBRpRUYLgnn0tvNvpJKui6c1q1Uqkbp6sldXTum777mwQj2Ta3MsVBce73lGoLZb2ksmtneWMI0ilVXSWa73InVuC3lkponaNLHF7dhj1JWyZM6q7DX4zEZhEwsrTs7p9p3fJ3SXP0k358fJn17n2r3nnleZteROO1cTze6pFq32opyT7lLvMOJpzV39PXwWWaZNfEvQQAc12wAAAAAAAHnPLKtfFzX7Kgv5VL+o1mHr2nnskrPr3Mn5Szvi6z+3b8KS9xh6t1qvbti+K4dZ1sUapD57PO8lp/WU+Ie7g0ZOCxhqqmJyV9qI9HVb3XBmjJ19KtfYT3NPhYt5qS6jOhKyblklm29iS25lVmYmVUjh8Ty11ZYqMZU9WEE8NK0mpyWUle9pZvK3A6HQOmIV6aalHnNVc5BX8l7L2eai7XV9qKRaJlrbDasbmG3cyyUizWLdYtpkkuVUiLWGsSJChrtJ1qkU3CpCnGNOrVqTnSnWtCkot6tOE4tvyuO45iHKWnVcY0YYrGTnLV8qo8HFO2WpSo+Uk+M5NmF81aTp6sXC3yRzR0dr/kxqlRHJ6F5R06zXM1tSTaX+lxdTa5WS5jF2zu3bVqK7byZuJaU8l/NuM1OpCUZOLcZUpypyV4tpq8XmXx5a36KZuHvj69EmOxdl8d5qnib3u969tyLE1W7uTNVTxN83xy6bGrDToFUurvhfqXF9PQOT2I1cVRl/yRX4nqv2mBTk5LN2W19hSjW1akZrLVlFr0Wnn3FbxuNJxzq0S9vKC4OQ+jAAAAAAqUEnZX4AeT6SqXxFWXGpPu1mWOn9V9cX7iK923xbfe7mU1dI7FI1D5u87mZaTSbkk2lf8AajvfSuEvaYPJ3SUZ1JQv5Vr2eTa4mz0u7K5yOjozqY/DunDy1ruclknShTnKet0pJlrTqNpx15p09FwtNLMkx9OpVSpRklTllVlrNT1N8aaStdrK98ilNE9KRWfcidTtzuJ5DRnKdqtqerLmYWb5qU2m875xTvl0m10dydjRjGUaj59NuVdq+una8JQvnCySSvla6NvFldYrGOsNJz5JjUym1uPh6ijkRi5dik1g5EbZRskR4ujzidK9udp1qF+DrU3GH86gu05f5GtK0IU6tTG0qNBYZxjHEybpN1J60XSlFu0ppJ5rPNXW86WvS14uLur7GsmntUovc00mnxRwHLLkhUxNWVXDqKrtuVbDuUYRqSdtbFYdyajaWTnG6cXxVmeHiaanmdXgcsTXknqy+UGGw603RweFw3NrnqVWpW52c4zptLESnCLerGCjrbOG42lDEOcHUWSqzq1rNWfz1SdVJ9k0aLk9oZUYOCq89VlDmqteLcqVOhe8sLhpvz3J5TqLyUm4xzuzo3GxPD0mP6lONyROqQ02nMUoQzdtbLxMLAq+avf3cF8d5h8rudjiacZJajpKpT37Zzg31+Q+zrNtoteSmeus7eG1eXqz6NPLMjrIzorIxKqzJlWHtWDnrU4S4xi++KZKa/k7U1sLQf8AxQ9UUvcbA48xqX0NZ3ESAAhYAAAixbtCbf7MvYyUsrxvGSW1xaXagiejxalpjDu3z9LtnFe8zI6Ww9vp6X/ZDxM56ErrzqM/wNirgJJWdOXbB+B14n9YfPWrrrE/9+zn9I46hJNc9Sz+3HxJ/k7wMZSxlWMoS1MLUinGSlZ1b55bMoMppHBtJtUn+B+B0XydYGawWNqTjKLneK1k1dQpt5X3Xm12Fcs6o14esTfp9/wigiS+4U4l0Fn8dJowS09hWLLlG2XRfwKX4koXMRFgkAQkVLWBHJmNpHDQqQ1akIzjdO0oqSTW+zJ94qx8mxEwRPu1FrZFHsJq0djLGiqzX/Kdg7UtHVUvOozg31OE1+eRgaMXkrNd6Oo+UvBqeicHOSTUJ073SdlKnOPtSOG0fgaLS+bpv0YlMMzNf9vRxERFo8R/DqYtWzku9GFXxlJbakF1yiveWYfRtH9zT/BHwJlgorZCK4WSNJ2wjlep8i6yngqMk7q0rNbGlOSTXQbo1XJWnKOEoxkmmovJ7bazay6rG1OTful3sfZHiAAFWgAAAAAqLlABW5iaXfzFX7kvYZRiaX+gqfdZandCmTsnw4VRKxiSapXVOtD55Wnm8yzVzzyJNR8H3Fqi31koLFbhgBYpNFbFJIkY62l81cs17S4k81dEDV1YkbiZMo7UR6pWVoeg6DpRlhaUZJSWpG6aTWXQzJjo6itlGmuqnDwIOT36tS+772bA5Vpnml38cRNI8QiWFgtkIfhRfGlFbIpdSRcCu19QAAJAAAAAAAAAAAMPTP0FTq96Mww9M/Qz6l7UWp3R5Z5ey3iXHpFXG7t2l6RT6x1YcCVjRSGXx3l9RcN/xYpq52RZVSSKNF7RSfR8doFEuJbVRfqls0EsJrMy7ZGJVyZmQ2X+OskYdVeV07yKxLVWZa0UlMO65OP/AG1Pqf5mbI1vJr9Wp+l+eRsjlX7p8u/i7K+IAAVaAAAAAAAAAAAAAAYOm/oZej+ZGcYGnPoX1x9qL4++PLLN+O3iXNRRbFrO/sJbZEaiuJ1IcGVYyWyz6Osj6Cuo9pdG17dxZCxIsaJrZkckQLou2ztI6hJBFswMOtC+ZPB5ePgY+IJcPLIkRYl7CySJcR1Ea2FbJh2vJr9Wp+l+eRszVcl5f7ePQ5L+Zv3m1OXk7p8u9h/HXxAACjUAAAAAAAAAAAAADX6c+i9JGwNfp36L0l7y+Lvhjn/Hbw5+Wws1OOXxwL5sjlDq70dSrhWI2Tyu33FbXYpwZW/xxJQJkVUkW0imwK00UmitMSYGBXL8OXV4LqKUr7vj3gVrRyzIY7CecSCBEph1fJGXzUlwm/XGJvDn+R78movtR9afgdAczN3y7nDTvFAADNuAAAAAAAAAAAAABrtPv5r0o+82JquUsvml99exl8XfDHP+O3ho6hHKfR7y5veRSWZ1YcGU8JZZhPc+9eBSpwK7Vfsfu+OghKjXAirRJLf4I68iRSi920rJkdIvnwCGHimW03frLsQQwZIyXN2MdMndt/cY8pZkSOl5HTzqr7j/ADHSnI8jKnztSPGCfdJf3HXHMz98u3wk/wBqAAGT0gAAAAAAAAAAAAAaflO/m4/f9zNwaLlVPKmuLl6kvE1w98PPxM6xS00nvRXDcWRuZPF2jd9B0vhw/lZKSfEkpNWu722bdpBTV2Suz2PseQTClR5kVbYiR9PeRz2EiGk8yZsxo7SaTCEOIjwzMeMrbO/wJ68zGi87BKW5E3mXOSLWghtuSM7Ym3GEl64v3HbHBcmJpYumuKnb8DZ3pzuI73Z4L8f7gAMHrAAAAAAAAAAAAAA5HltinGthYKLak6ms/wBlat7vtikdcclysn8/FcKa9cpeBtgjd4ebi51ilrk8yXEVPqmNSqJXky+g9Zt7jpOIyKeS+OwtjmU5zcW61wJe3u8SOVQpKe5EM2ErZLO5JchU7FZTXUBZXZj6xLKZjylmBMmUnIjjItqSA2nJhr/V07v9u3S9R+5M9BPNtAVLYqk/t27017z0g5/Ex/W6/BTvHr9QAHnewAAAAAAAAAAAAADleVWEqSrRlGEnHUSbSbV05bbdZ1RUvjvyTtllxRkryy86cVsdstxWtioxW1LoO/q4eEvOjGXXFP2mLV0Nh5edQpP0I+B6o4uPmHgngJ+LOGjib8H2k8ZX2JZ/a9uR1v6O4T+Hp/hC5PYVbKEF1XXvJ9XX6R6C/wBw5CWW32kM7vYvWjuHoPD7HSjbt8SP9HcL+5XfJe8n1dfqT0F/uHFyk9ur6/8ABFKS6vS/wd1+j2G/dfzT/uEuT+Fe2jF9d37WR6qv1J6C/wBw4XXytqp+ln2ZEUKTzeX4v8Hfrk7hP4en+FFf0fwv7in+FD1VfpPoLfcPPknwT7Sx34I9Ip6Fw0dlCkvQj4GVSw0I+bCMeqKXsInio+kxwE/NnA8ntF1ZV6U9R6kZKTk1aOWeTe3O2w9DBQ82TJN529uHDGKuoAAZtgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//Z'} alt="poster" width={400} height={500} />
                <div className="item-description">
                  <ul className="name-trash">
                    <li><p className="item-name">Blusa Botafogo Goleiro 2022</p></li>
                    <li>
                      <TrashButton
                        id={userOrder?.key}
                        product={item.product}
                      />
                    </li>
                  </ul>
                  <ul className="quantity-price">
                    <li>
                      <NumberInput
                        id={userOrder?.key}
                        product={item.product}
                        quantity={item.quantity}
                      />
                    </li>
                    <li><p className="item-price">R${item.quantity * 30}</p></li>
                  </ul>
                </div>
            </div>
          ))}
        </div>
          <Link href={`/api`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-5 px-20 rounded">
            Finalizar Pedido
          </Link>
        </div>
      </div>
  );
};
