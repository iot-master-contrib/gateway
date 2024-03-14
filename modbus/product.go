package modbus

import (
	"errors"
	"github.com/zgwit/iot-master/v4/lib"
	"time"
)

type Product struct {
	Id   string `json:"id" xorm:"pk"`
	Name string `json:"name,omitempty"` //名称
	Desc string `json:"desc,omitempty"` //说明

	Mappers     []*Mapper     `json:"mappers" xorm:"json"`
	Filters     []*Filter     `json:"filters" xorm:"json"`
	Calculators []*Calculator `json:"calculators" xorm:"json"`
	Created     time.Time     `json:"created" xorm:"created"` //创建时间
}

type Filter struct {
	Name       string `json:"name"`       //字段
	Expression string `json:"expression"` //表达式
	//Entire     bool   `json:"entire"`
}

type Calculator struct {
	Name       string `json:"name"`       //赋值
	Expression string `json:"expression"` //表达式
}

var products lib.Map[Product]

func GetProduct(id string) (*Product, error) {
	p := products.Load(id)
	if p == nil {
		return nil, errors.New("找不到产品")
	}
	return p, nil
}
