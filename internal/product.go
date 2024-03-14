package internal

import (
	"github.com/PaesslerAG/gval"
	"github.com/iot-master-contrib/gateway/modbus"
	"github.com/zgwit/iot-master/v4/lib"
	"github.com/zgwit/iot-master/v4/pkg/calc"
	"github.com/zgwit/iot-master/v4/pkg/db"
	"github.com/zgwit/iot-master/v4/pkg/log"
	"xorm.io/xorm"
)

type Product struct {
	*modbus.Product

	filters     []gval.Evaluable
	calculators []gval.Evaluable
}

var Products lib.Map[Product]

func LoadProducts() error {
	var products []*modbus.Product
	err := db.Engine.Find(&products)
	if err != nil {
		if err == xorm.ErrNotExist {
			return nil
		}
		return err
	}
	for _, m := range products {
		err := LoadProduct(m)
		if err != nil {
			log.Error(err)
		}
	}
	return nil
}

func LoadProduct(m *modbus.Product) error {
	p := &Product{Product: m}

	for _, v := range m.Filters {
		expr, err := calc.New(v.Expression)
		if err != nil {
			return err
		}
		p.filters = append(p.filters, expr)
	}

	for _, v := range m.Calculators {
		expr, err := calc.New(v.Expression)
		if err != nil {
			return err
		}
		p.calculators = append(p.calculators, expr)
	}

	Products.Store(m.Id, p)
	return nil
}

func GetProduct(id string) *Product {
	return Products.Load(id)
}
