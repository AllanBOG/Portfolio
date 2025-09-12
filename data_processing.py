# data_processing.py
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta
import warnings
import os

warnings.filterwarnings('ignore')

# Configurar paths - PARA ARCHIVO EXCEL
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_RAW_PATH = os.path.join(BASE_DIR, 'data', 'raw', 'OnlineRetail.xlsx')  # ← .xlsx
DATA_DIR = os.path.join(BASE_DIR, 'data')
RAW_DIR = os.path.join(BASE_DIR, 'data', 'raw')
PROCESSED_DIR = os.path.join(BASE_DIR, 'data', 'processed')
IMAGES_DIR = os.path.join(BASE_DIR, 'images')

# Configuración de visualización
plt.style.use('default')
sns.set_palette("viridis")
plt.rcParams['figure.figsize'] = (12, 6)

class RetailDataProcessor:
    def __init__(self, file_path):
        self.file_path = file_path
        self.df = None
        self.df_clean = None
        
    def load_data(self):
        """Cargar datos desde archivo Excel"""
        try:
            # Verificar si el archivo existe
            if not os.path.exists(self.file_path):
                print(f"❌ Error: El archivo {self.file_path} no existe")
                print("📋 Archivos encontrados en la carpeta raw/:")
                raw_files = os.listdir(os.path.dirname(self.file_path))
                for file in raw_files:
                    print(f"   - {file}")
                return False
            
            print(f"📖 Leyendo archivo Excel: {self.file_path}")
            
            # Leer archivo Excel
            self.df = pd.read_excel(self.file_path, engine='openpyxl')
            
            print(f"✅ Datos cargados exitosamente: {self.df.shape[0]} filas, {self.df.shape[1]} columnas")
            
            # Mostrar información básica
            print(f"📅 Columnas disponibles: {list(self.df.columns)}")
            print(f"📊 Tipos de datos:")
            print(self.df.dtypes)
            
            return True
                
        except Exception as e:
            print(f"❌ Error al cargar datos Excel: {e}")
            print("💡 Asegúrate de tener instalado: pip install openpyxl")
            return False
    
    def explore_data(self):
        """Exploración inicial de los datos"""
        if self.df is None:
            print("❌ Primero debe cargar los datos")
            return
            
        print("\n" + "="*60)
        print("🔍 EXPLORACIÓN INICIAL DE DATOS")
        print("="*60)
        
        print("\n📊 Primeras 3 filas:")
        print(self.df.head(3))
        
        print("\n📋 Información del dataset:")
        print(self.df.info())
        
        print("\n📈 Estadísticas descriptivas:")
        print(self.df.describe())
        
        print("\n❓ Valores nulos por columna:")
        null_counts = self.df.isnull().sum()
        for col, count in null_counts.items():
            if count > 0:
                percentage = (count / len(self.df)) * 100
                print(f"   {col}: {count} nulos ({percentage:.2f}%)")
        
        print("\n🌍 Países únicos:", self.df['Country'].nunique())
        print("👥 Clientes únicos:", self.df['CustomerID'].nunique())
        print("📦 Productos únicos:", self.df['StockCode'].nunique())
    
    def clean_data(self):
        """Limpieza y transformación de datos"""
        if self.df is None:
            print("❌ Primero debe cargar los datos")
            return None
            
        print("\n" + "="*60)
        print("🧹 LIMPIEZA DE DATOS")
        print("="*60)
        
        # Crear copia del dataframe
        df_clean = self.df.copy()
        print(f"📦 Filas iniciales: {len(df_clean):,}")
        
        # 1. Eliminar filas con CustomerID nulo
        initial_count = len(df_clean)
        df_clean = df_clean[df_clean['CustomerID'].notnull()]
        removed = initial_count - len(df_clean)
        print(f"   ✅ Eliminadas {removed:,} filas con CustomerID nulo")
        
        # 2. Convertir tipos de datos
        df_clean['InvoiceDate'] = pd.to_datetime(df_clean['InvoiceDate'])
        df_clean['CustomerID'] = df_clean['CustomerID'].astype('int64')
        
        # 3. Filtrar cantidades y precios positivos
        initial_count = len(df_clean)
        df_clean = df_clean[df_clean['Quantity'] > 0]
        df_clean = df_clean[df_clean['UnitPrice'] > 0]
        removed = initial_count - len(df_clean)
        print(f"   ✅ Eliminadas {removed:,} filas con cantidades/precios inválidos")
        
        # 4. Calcular el monto total de cada transacción
        df_clean['TotalAmount'] = df_clean['Quantity'] * df_clean['UnitPrice']
        
        # 5. Extraer componentes de fecha
        df_clean['InvoiceYear'] = df_clean['InvoiceDate'].dt.year
        df_clean['InvoiceMonth'] = df_clean['InvoiceDate'].dt.month
        df_clean['InvoiceDay'] = df_clean['InvoiceDate'].dt.day
        df_clean['InvoiceWeekday'] = df_clean['InvoiceDate'].dt.weekday
        df_clean['InvoiceHour'] = df_clean['InvoiceDate'].dt.hour
        
        # 6. Eliminar duplicados
        initial_count = len(df_clean)
        df_clean = df_clean.drop_duplicates()
        removed = initial_count - len(df_clean)
        print(f"   ✅ Eliminados {removed:,} duplicados")
        
        self.df_clean = df_clean
        print(f"🎯 Filas finales después de limpieza: {self.df_clean.shape[0]:,}")
        print(f"💰 Ventas totales: £{self.df_clean['TotalAmount'].sum():,.2f}")
        
        return df_clean
    
    def perform_eda(self):
        """Análisis exploratorio de datos"""
        if self.df_clean is None:
            print("❌ Primero debe limpiar los datos")
            return
        
        print("\n" + "="*60)
        print("📊 ANÁLISIS EXPLORATORIO")
        print("="*60)
        
        # Asegurar que existe la carpeta de imágenes
        os.makedirs(IMAGES_DIR, exist_ok=True)
        
        # 1. Ventas por país (Top 10)
        plt.figure(figsize=(12, 8))
        country_sales = self.df_clean.groupby('Country')['TotalAmount'].sum().nlargest(10)
        colors = plt.cm.Set3(np.linspace(0, 1, len(country_sales)))
        country_sales.plot(kind='barh', color=colors)
        plt.title('Top 10 Países por Ventas', fontsize=14, fontweight='bold')
        plt.xlabel('Ventas Totales (£)', fontweight='bold')
        plt.ylabel('País', fontweight='bold')
        plt.gca().invert_yaxis()
        plt.tight_layout()
        plt.savefig(os.path.join(IMAGES_DIR, 'top_countries.png'), dpi=300, bbox_inches='tight')
        plt.show()
        
        # 2. Ventas mensuales
        plt.figure(figsize=(12, 6))
        monthly_sales = self.df_clean.groupby('InvoiceMonth')['TotalAmount'].sum()
        monthly_sales.plot(kind='line', marker='o', linewidth=2.5, markersize=8, color='#2E86AB')
        plt.title('Ventas Mensuales', fontsize=14, fontweight='bold')
        plt.xlabel('Mes', fontweight='bold')
        plt.ylabel('Ventas (£)', fontweight='bold')
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        plt.savefig(os.path.join(IMAGES_DIR, 'monthly_sales.png'), dpi=300, bbox_inches='tight')
        plt.show()
        
        # 3. Top 10 productos
        plt.figure(figsize=(12, 8))
        top_products = self.df_clean.groupby('Description')['TotalAmount'].sum().nlargest(10)
        colors = plt.cm.Pastel1(np.linspace(0, 1, len(top_products)))
        top_products.plot(kind='barh', color=colors)
        plt.title('Top 10 Productos por Ventas', fontsize=14, fontweight='bold')
        plt.xlabel('Ventas Totales (£)', fontweight='bold')
        plt.tight_layout()
        plt.savefig(os.path.join(IMAGES_DIR, 'top_products.png'), dpi=300, bbox_inches='tight')
        plt.show()
        
        # 4. Resumen estadístico
        print("\n📈 RESUMEN ESTADÍSTICO FINAL:")
        print(f"   Total de ventas: £{self.df_clean['TotalAmount'].sum():,.2f}")
        print(f"   Total de transacciones: {self.df_clean['InvoiceNo'].nunique():,}")
        print(f"   Total de clientes únicos: {self.df_clean['CustomerID'].nunique():,}")
        print(f"   Total de productos únicos: {self.df_clean['StockCode'].nunique():,}")
        print(f"   Período: {self.df_clean['InvoiceDate'].min().date()} to {self.df_clean['InvoiceDate'].max().date()}")
        print(f"   Ticket promedio: £{self.df_clean['TotalAmount'].mean():.2f}")
    
    def save_results(self):
        """Guardar todos los resultados"""
        if self.df_clean is not None:
            # Asegurar que existen las carpetas
            os.makedirs(PROCESSED_DIR, exist_ok=True)
            
            # Guardar datos limpios como CSV
            output_path = os.path.join(PROCESSED_DIR, 'retail_clean.csv')
            self.df_clean.to_csv(output_path, index=False, encoding='utf-8')
            print(f"💾 Datos limpios guardados en: {output_path}")
            
            print(f"📸 Gráficos guardados en: {IMAGES_DIR}")
        else:
            print("❌ No hay datos limpios para guardar")

# Función principal
def main():
    print("🎯 PROCESADOR DE DATOS RETAIL - EXCEL")
    print("📍 Directorio base:", BASE_DIR)
    print("📁 Archivo:", DATA_RAW_PATH)
    print("="*70)
    
    # Asegurar que existen las carpetas necesarias
    os.makedirs(RAW_DIR, exist_ok=True)
    os.makedirs(PROCESSED_DIR, exist_ok=True)
    os.makedirs(IMAGES_DIR, exist_ok=True)
    
    # Inicializar procesador
    processor = RetailDataProcessor(DATA_RAW_PATH)
    
    # Cargar datos
    if processor.load_data():
        # Explorar datos crudos
        processor.explore_data()
        
        # Limpiar datos
        df_clean = processor.clean_data()
        
        if df_clean is not None and len(df_clean) > 0:
            # Realizar análisis exploratorio
            processor.perform_eda()
            
            # Guardar resultados
            processor.save_results()
            
            print("\n" + "="*70)
            print("✅ ¡PROCESAMIENTO COMPLETADO EXITOSAMENTE!")
            print("="*70)
            print("📊 Análisis realizado sobre datos Excel")
            print("📸 Gráficos guardados en carpeta 'images'")
            print("💾 Datos procesados guardados en CSV")

# Instalación de dependencias necesarias
def check_dependencies():
    try:
        import openpyxl
        print("✅ openpyxl está instalado")
    except ImportError:
        print("❌ openpyxl no está instalado")
        print("💡 Ejecuta: pip install openpyxl")

if __name__ == "__main__":
    check_dependencies()
    main()