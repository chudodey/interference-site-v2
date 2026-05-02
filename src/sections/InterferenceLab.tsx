import SectionTag from '../components/SectionTag';
import WaveInterference from '../components/WaveInterference';
import InlineMath from '../components/InlineMath';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { t } from '../styles/typography';
import { s } from '../styles/spacing';

export default function InterferenceLab() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} id="interference" className={`${s.section} bg-bg-primary reveal`}>
      <div className={`max-w-5xl mx-auto ${s.container}`}>
        <SectionTag number="04">Лаборатория</SectionTag>

        <h2 className={`${t.h2} ${s.mbSm}`}>
          <span className="text-peach">Интерференция</span>{' '}
          <span className="text-text-primary">волн</span>
        </h2>

        <div className={`grid grid-cols-1 lg:grid-cols-2 ${s.gapLg} ${s.mbLg}`}>
          <div>
            <p className={`${t.bodyPrimary} text-text-primary ${s.mbSm}`}>
              Когда две или более когерентных волны накладываются друг на друга, их амплитуды
              складываются по принципу суперпозиции. В точках, где волны приходят в фазе, амплитуда
              усиливается — возникает{' '}
              <span className="text-accent-primary">конструктивная интерференция</span>. Там, где
              они противофазны — ослабляется или гасится —{' '}
              <span className="text-accent-secondary">деструктивная интерференция</span>.
            </p>
            <p className={`${t.bodySecondary} text-text-muted ${s.mbSm}`}>
              Это классический феномен — волны на воде, свет, звук. Но тот же математический аппарат
              описывает интерференцию вероятностей в квантовой механике и волновые функции, которые
              вдохновили спектакль. Коллективное внимание зрителей — как наложение множества
              волновых функций, которое «схлопывается» в конкретное состояние в момент наблюдения.
            </p>
            <p className={`${t.bodySecondary} text-text-muted ${s.mbSm}`}>
              Параллель с мозгом прямолинейна: нейроны тоже генерируют волны. ЭЭГ регистрирует их
              интерференцию — суммарную активность миллиардов клеток. Когда зрители синхронизируют
              внимание, их ритмы накладываются друг на друга, усиливая или ослабляя общий сигнал.
              Альфа, бета, гамма — это не абстракции, а физические колебания, которые мы превращаем
              в свет, звук и движение.
            </p>
            <p className={`${t.caption} text-text-subtle`}>
              На симуляторе справа вы можете перемещать источники (перетаскивайте мышью или пальцем)
              и наблюдать, как меняется интерференционная картина. Настройте{' '}
              <InlineMath tex="\lambda" /> — длину волны — и посмотрите, как масштаб полос зависит
              от неё. Добавьте разности фаз и увидите, как смещается вся система.
            </p>
          </div>

          <div className={`border border-border bg-bg-secondary ${s.card}`}>
            <span className={`${t.label} text-text-muted block ${s.mbSm}`}>Параметры модели</span>

            {/* Main equation */}
            <div className={`${s.mbSm} pb-3 border-b border-border`}>
              <div className={`flex justify-center ${s.mbSm}`}>
                <InlineMath tex="E(x, y, t) = \sum A_i \cdot \cos(k_i r - \omega t + \varphi_i)" />
              </div>
              <p className={`${t.caption} text-text-subtle text-center`}>
                Суммарная амплитуда от всех источников в точке наблюдения
              </p>
            </div>

            {/* Legend */}
            <div className={`${s.stack} ${t.caption} ${s.mbSm}`}>
              <div className={`grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 ${t.caption}`}>
                <span className="text-text-primary">
                  <InlineMath tex="E" />
                </span>
                <span className="text-text-muted">амплитуда волны в точке наблюдения</span>

                <span className="text-text-primary">
                  <InlineMath tex="x, y" />
                </span>
                <span className="text-text-muted">координаты точки на плоскости</span>

                <span className="text-text-primary">
                  <InlineMath tex="t" />
                </span>
                <span className="text-text-muted">время</span>

                <span className="text-text-primary">
                  <InlineMath tex="A_i" />
                </span>
                <span className="text-text-muted">амплитуда i-го источника</span>

                <span className="text-text-primary">
                  <InlineMath tex="k_i" />
                </span>
                <span className="text-text-muted">
                  волновое число i-го источника, <InlineMath tex="k = 2\pi/\lambda" />
                </span>

                <span className="text-text-primary">
                  <InlineMath tex="r" />
                </span>
                <span className="text-text-muted">
                  расстояние от источника, <InlineMath tex="r = \sqrt{\Delta x^2 + \Delta y^2}" />
                </span>

                <span className="text-text-primary">
                  <InlineMath tex="\omega" />
                </span>
                <span className="text-text-muted">угловая частота</span>

                <span className="text-text-primary">
                  <InlineMath tex="\varphi_i" />
                </span>
                <span className="text-text-muted">начальная фаза i-го источника</span>

                <span className="text-text-primary">
                  <InlineMath tex="\lambda" />
                </span>
                <span className="text-text-muted">длина волны</span>
              </div>
            </div>

            {/* Interference conditions */}
            <div className={`${s.stack} pb-3 border-b border-border ${s.mbSm}`}>
              <span className={`${t.label} text-text-muted block`}>Условия интерференции</span>
              <div className={`flex flex-wrap ${s.gapSm} items-baseline`}>
                <span className={`${t.caption} text-text-muted shrink-0`}>
                  конструктивная (максимум амплитуды)
                </span>
                <span className={`${t.caption} text-text-primary`}>
                  <InlineMath tex="\Delta r = m \cdot \lambda" />
                </span>
              </div>
              <div className={`flex flex-wrap ${s.gapSm} items-baseline`}>
                <span className={`${t.caption} text-text-muted shrink-0`}>
                  деструктивная (минимум амплитуды)
                </span>
                <span className={`${t.caption} text-text-primary`}>
                  <InlineMath tex="\Delta r = (m + \tfrac{1}{2}) \cdot \lambda" />
                </span>
              </div>
              <p className={`${t.caption} text-text-subtle`}>
                <InlineMath tex="\Delta r" /> — разность расстояний от двух источников до точки
                наблюдения. <InlineMath tex="m" /> = 0, 1, 2, … — целое число (порядок
                интерференции).
              </p>
            </div>

            {/* Simulator link */}
            <div className={t.caption}>
              <span className={`${t.label} text-text-muted block ${s.mbSm}`}>
                Настройка в симуляторе
              </span>
              <p className={`${t.caption} text-text-muted`}>
                <InlineMath tex="\lambda = \lambda_0 \cdot" />{' '}
                <span className={`${t.highlight} text-accent-primary`}>
                  <InlineMath tex="\lambda" /> factor
                </span>{' '}
                — ползунок под каждым источником меняет длину волны относительно базового значения{' '}
                <InlineMath tex="\lambda_0" />.
              </p>
            </div>
          </div>
        </div>

        <WaveInterference />
      </div>
    </section>
  );
}
